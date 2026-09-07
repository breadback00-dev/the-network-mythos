extends Node

var failures: int = 0
var encounter: Node3D
var output: String
var samples: Array[float] = []

func _ready() -> void:
	output = OS.get_environment("NETWORK_PROOF_RESULTS")
	if output.is_empty(): output = "user://proof-results"
	DirAccess.make_dir_recursive_absolute(output)
	encounter = get_parent()
	call_deferred("run")

func expect(condition: bool, description: String) -> void:
	print(("PASS: " if condition else "FAIL: ") + description)
	if not condition: failures += 1

func press_button(text: String) -> void:
	for control in encounter.body.get_children():
		if control is Button and control.text == text:
			control.pressed.emit()
			return
	expect(false, "required button exists: " + text)

func capture(name: String) -> void:
	await RenderingServer.frame_post_draw
	var image = get_viewport().get_texture().get_image()
	expect(not image.is_empty(), "rendered image exists: " + name)
	if not image.is_empty(): image.save_png(output.path_join(name + ".png"))

func run() -> void:
	await get_tree().create_timer(1.0).timeout
	print("RENDERER: " + RenderingServer.get_current_rendering_method())
	print("GPU: " + RenderingServer.get_video_adapter_name())
	expect(not encounter.rules.request_issued and encounter.pins.is_empty(), "a fresh launch starts the proof without prior progress")
	await capture("native-welcome")
	encounter.close_page()
	await get_tree().create_timer(0.5).timeout
	await capture("native-room")
	var start_position = encounter.player.position
	Input.action_press("move_forward")
	await get_tree().create_timer(0.4).timeout
	Input.action_release("move_forward")
	expect(encounter.player.position.distance_to(start_position) > 0.2, "movement changes player position")
	encounter.open_page("summary")
	var inspect_position = encounter.player.position
	Input.action_press("move_forward")
	await get_tree().create_timer(0.2).timeout
	Input.action_release("move_forward")
	expect(encounter.player.position.distance_to(inspect_position) < 0.1, "inspection owns input and stops walking")
	encounter.open_page("oracle")
	encounter.present_finding("scope")
	expect(not encounter.rules.request_issued, "missing pinned evidence cannot solve the encounter")
	encounter.open_page("summary")
	press_button("Pin this passage")
	encounter.open_page("scope")
	press_button("Pin this passage")
	expect(encounter.pins.has("summary") and encounter.pins.has("scope"), "source controls pin both passages")
	encounter.open_page("oracle")
	encounter.present_finding("replacement")
	expect(not encounter.rules.request_issued, "unsupported replacement claim is rejected")
	encounter.present_finding("scope")
	expect(encounter.rules.request_issued and encounter.world.solved, "supported finding changes avatar and issues request")
	await capture("native-finding")
	encounter.open_page("credential")
	encounter.present_credential("account_badge")
	expect(encounter.feedback.text.begins_with("NOT AUTHORIZED"), "credential display refuses account badge")
	encounter.present_credential("review_request")
	expect(encounter.feedback.text.begins_with("AUTHORIZED"), "credential display accepts issued source review")
	encounter.open_page("oracle")
	expect(encounter.speech.stream != null, "packaged Oracle voice loads")
	encounter.play_oracle()
	await get_tree().create_timer(0.4).timeout
	expect(encounter.speech.get_playback_position() > 0.1, "voice playback advances")
	expect(encounter.captions.text.contains("Oracle:"), "Oracle speech has a caption equivalent")
	encounter._notification(MainLoop.NOTIFICATION_APPLICATION_FOCUS_OUT)
	expect(encounter.speech.stream_paused, "focus loss pauses Oracle speech")
	encounter.play_oracle()
	await get_tree().create_timer(0.3).timeout
	expect(not encounter.speech.stream_paused and encounter.speech.get_playback_position() > 0.1, "explicit replay resumes Oracle speech after focus loss")
	encounter.open_page("video")
	expect(not encounter.speech.playing, "switching to evidence stops encounter speech")
	expect(encounter.movie.stream != null and encounter.cues.size() > 1, "packaged video and caption cues load")
	encounter.toggle_video()
	await get_tree().create_timer(1.0).timeout
	expect(encounter.movie.stream_position > 0.3, "Theora video decoding advances")
	expect(not encounter.movie.get_video_texture().get_image().is_empty(), "decoded video supplies an actual texture")
	await capture("native-video")
	encounter.play_cue(10.0)
	await get_tree().create_timer(0.4).timeout
	expect(encounter.movie.stream_position >= 9.9, "cue replay seeks to the requested time")
	encounter._notification(MainLoop.NOTIFICATION_APPLICATION_FOCUS_OUT)
	expect(not encounter.player.active, "focus loss releases movement")
	expect(encounter.movie.paused and encounter.movie.stream_position >= 9.9, "focus loss pauses media without losing the cue")
	encounter.close_page()
	expect(not encounter.movie.is_playing() and not encounter.speech.playing, "leaving evidence stops all owned media")
	encounter.open_page("video")
	var original_stream = encounter.movie.stream
	encounter.movie.stream = null
	encounter.toggle_video()
	expect(encounter.feedback.text.contains("unavailable"), "missing media gives a usable transcript fallback")
	encounter.movie.stream = original_stream
	encounter.close_page()
	encounter.player.position = Vector3(0, 0.05, 5)
	await capture("native-gap")
	var previous_frame = Time.get_ticks_usec()
	for i in range(240):
		await get_tree().process_frame
		var current_frame = Time.get_ticks_usec()
		samples.append((current_frame - previous_frame) / 1000.0)
		previous_frame = current_frame
	samples.sort()
	var metrics = {"engine": Engine.get_version_info().string, "renderer": RenderingServer.get_current_rendering_method(), "gpu": RenderingServer.get_video_adapter_name(), "window_size": str(get_window().size), "frames": samples.size(), "p95_frame_ms": samples[int(samples.size() * 0.95)], "max_frame_ms": samples.back(), "failures": failures, "note": "Short automated wall-clock scene sample; not a chapter performance benchmark or human playtest."}
	var file = FileAccess.open(output.path_join("scene-results.json"), FileAccess.WRITE)
	file.store_string(JSON.stringify(metrics, "  "))
	file.close()
	print("RESULT: " + JSON.stringify(metrics))
	if failures > 0:
		get_tree().quit(1)
	else:
		encounter.open_page("exit")
		press_button("Exit to desktop")

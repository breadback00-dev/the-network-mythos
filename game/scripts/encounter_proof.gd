extends Node3D

const Rules = preload("res://scripts/proof_rules.gd")
const Player = preload("res://scripts/proof_player.gd")
const World = preload("res://scripts/proof_world.gd")
const MEDIA = "res://tests/fixtures/media/"
const ORACLE_WORDS = "Mara Vale returned to public life. Her account remains authentic. The record is coherent. If you find a gap, bring me the sources. I will leave room for what they cannot answer."
const SUMMARY = "PUBLIC SUMMARY — OpenLattice Answers\nCaptured 6 November 2030\n\nIn November 2030, Vale returned to public writing.\n\nThere is no verified evidence that Vale was impersonated, replaced, or coerced. Threadline verification records continue to identify the account as authentic.\n\nThis summary makes a claim about a person. Its reference to account verification may not establish that claim."
const SCOPE = "PUBLIC SCOPE NOTICE — Threadline\nPublished 10 November 2030; excerpt of the 9 November review\n\nThe current account presence satisfies platform authenticity requirements. Threadline does not adjudicate metaphysical claims of personal continuity.\n\nAccount continuity is within this test. Who is operating the account is not established by the test. This public excerpt is available before access to the restricted service records."

var rules = Rules.new()
var world: Node3D
var player: CharacterBody3D
var pins: Array = []
var page: String = ""
var target: String = ""
var panel: PanelContainer
var body: VBoxContainer
var feedback: Label
var pin_label: Label
var prompt: Label
var status: Label
var captions: Label
var movie: VideoStreamPlayer
var speech: AudioStreamPlayer
var video_view: SubViewport
var cues: Array = []
var video_position: Label

func _ready() -> void:
	_setup_actions()
	world = World.new()
	add_child(world)
	player = Player.new()
	player.position = Vector3(0, 0.05, 5.0)
	add_child(player)
	_setup_media()
	_setup_ui()
	open_page("welcome")
	if OS.get_cmdline_user_args().has("--verify-native"):
		add_child(load("res://tests/test_scene.gd").new())

func _setup_actions() -> void:
	var keys = {"move_forward": KEY_W, "move_back": KEY_S, "move_left": KEY_A, "move_right": KEY_D, "interact": KEY_E, "journal": KEY_TAB}
	for action in keys:
		if not InputMap.has_action(action):
			InputMap.add_action(action)
			var event = InputEventKey.new()
			event.physical_keycode = keys[action]
			InputMap.action_add_event(action, event)

func _setup_media() -> void:
	video_view = SubViewport.new()
	video_view.size = Vector2i(360, 640)
	video_view.disable_3d = true
	video_view.render_target_update_mode = SubViewport.UPDATE_ALWAYS
	add_child(video_view)
	var poster = TextureRect.new()
	poster.size = Vector2(360, 640)
	poster.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	poster.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
	if ResourceLoader.exists(MEDIA + "return-poster.png"):
		poster.texture = load(MEDIA + "return-poster.png")
	video_view.add_child(poster)
	movie = VideoStreamPlayer.new()
	movie.size = Vector2(360, 640)
	movie.expand = true
	if ResourceLoader.exists(MEDIA + "return.ogv"):
		movie.stream = load(MEDIA + "return.ogv")
	video_view.add_child(movie)
	movie.finished.connect(func(): movie.paused = true)
	var screen = QuadMesh.new()
	screen.size = Vector2(1.51, 2.69)
	var surface = StandardMaterial3D.new()
	surface.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	surface.albedo_texture = video_view.get_texture()
	world.mesh(screen, Vector3(-3.7, 1.9, -3.43), surface)
	speech = AudioStreamPlayer.new()
	if ResourceLoader.exists(MEDIA + "oracle.wav"):
		speech.stream = load(MEDIA + "oracle.wav")
	add_child(speech)
	if FileAccess.file_exists(MEDIA + "return.vtt"):
		var blocks = FileAccess.get_file_as_string(MEDIA + "return.vtt").replace("\r", "").split("\n\n")
		for block in blocks:
			var lines = block.split("\n")
			for i in range(lines.size()):
				if lines[i].contains(" --> "):
					var times = lines[i].split(" --> ")
					cues.append({"start": _seconds(times[0]), "end": _seconds(times[1]), "text": " ".join(lines.slice(i + 1))})

func _seconds(timestamp: String) -> float:
	var parts = timestamp.strip_edges().split(":")
	return float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])

func _setup_ui() -> void:
	var layer = CanvasLayer.new()
	add_child(layer)
	var root = Control.new()
	root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	root.mouse_filter = Control.MOUSE_FILTER_IGNORE
	layer.add_child(root)
	var theme = Theme.new()
	theme.default_font_size = 20
	var font = SystemFont.new()
	font.font_names = PackedStringArray(["Segoe UI", "Arial"])
	theme.default_font = font
	theme.set_color("font_color", "Label", Color("e9e6d9"))
	for state in ["normal", "hover", "pressed", "focus"]:
		var style = StyleBoxFlat.new()
		style.bg_color = Color("263e45") if state == "normal" else Color("3c6268")
		style.border_color = Color("91b7ae")
		style.set_border_width_all(2 if state == "focus" else 1)
		style.set_content_margin_all(12)
		theme.set_stylebox(state, "Button", style)
	root.theme = theme
	var header = Label.new()
	header.text = "THE NETWORK MYTHOS    /    ENTER THE NETWORK"
	header.position = Vector2(28, 22)
	header.add_theme_font_size_override("font_size", 17)
	header.modulate = Color("d8b983")
	root.add_child(header)
	status = Label.new()
	status.text = "THE ORACLE    ·    A question left open"
	status.position = Vector2(28, 50)
	status.add_theme_font_size_override("font_size", 24)
	root.add_child(status)
	prompt = Label.new()
	prompt.set_anchors_and_offsets_preset(Control.PRESET_CENTER_BOTTOM)
	prompt.offset_left = -420
	prompt.offset_right = 420
	prompt.offset_top = -69
	prompt.offset_bottom = -36
	prompt.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	root.add_child(prompt)
	var controls = Label.new()
	controls.text = "W A S D  move     MOUSE  look     E  inspect     TAB  notebook     ESC  pause"
	controls.set_anchors_and_offsets_preset(Control.PRESET_BOTTOM_WIDE)
	controls.offset_top = -30
	controls.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	controls.add_theme_font_size_override("font_size", 15)
	root.add_child(controls)
	var reticle = Label.new()
	reticle.text = "·"
	reticle.set_anchors_and_offsets_preset(Control.PRESET_CENTER)
	reticle.offset_left = -5
	reticle.offset_top = -16
	reticle.add_theme_font_size_override("font_size", 30)
	root.add_child(reticle)
	captions = Label.new()
	captions.set_anchors_and_offsets_preset(Control.PRESET_BOTTOM_WIDE)
	captions.offset_left = 180
	captions.offset_right = -180
	captions.offset_top = -98
	captions.offset_bottom = -40
	captions.z_index = 10
	captions.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	captions.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	captions.add_theme_color_override("font_shadow_color", Color.BLACK)
	captions.add_theme_constant_override("shadow_outline_size", 8)
	root.add_child(captions)
	panel = PanelContainer.new()
	panel.set_anchors_and_offsets_preset(Control.PRESET_CENTER)
	panel.offset_left = -350
	panel.offset_right = 350
	panel.offset_top = -252
	panel.offset_bottom = 252
	var background = StyleBoxFlat.new()
	background.bg_color = Color(0.045, 0.075, 0.095, 0.98)
	background.border_color = Color("b39363")
	background.set_border_width_all(1)
	background.set_content_margin_all(26)
	panel.add_theme_stylebox_override("panel", background)
	root.add_child(panel)
	var scroll = ScrollContainer.new()
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	panel.add_child(scroll)
	body = VBoxContainer.new()
	body.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	body.add_theme_constant_override("separation", 12)
	scroll.add_child(body)

func words(text: String, size: int = 20) -> Label:
	var label = Label.new()
	label.text = text
	label.add_theme_font_size_override("font_size", size)
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	body.add_child(label)
	return label

func button(text: String, action: Callable) -> Button:
	var control = Button.new()
	control.text = text
	control.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	control.pressed.connect(action)
	body.add_child(control)
	return control

func open_page(id: String) -> void:
	_stop_media()
	page = id
	player.set_active(false)
	panel.show()
	for child in body.get_children():
		body.remove_child(child)
		child.queue_free()
	feedback = null
	pin_label = null
	video_position = null
	match id:
		"welcome":
			words("THE SPACE BETWEEN THE SOURCES", 30)
			words("You are the Archivist. Mara Vale's account has returned. The Oracle offers a complete explanation. Find what its sources actually support.")
			words("Inspect the public summary and verification scope. Pin their passages, then present your finding to the Oracle. The Porchlight recording provides context, not proof.")
			button("Enter the chamber", close_page)
			words("Early encounter · provisional art and voices · this session resets when you exit", 15)
		"summary", "scope":
			words("THE PUBLIC SUMMARY" if id == "summary" else "THE BADGE'S LIMIT", 28)
			words(SUMMARY if id == "summary" else SCOPE)
			button("Remove pinned passage" if pins.has(id) else "Pin this passage", func():
				if pins.has(id): pins.erase(id)
				else: pins.append(id)
				open_page(id))
		"oracle":
			words("THE ORACLE", 30)
			words("Which part of this account should remain unanswered?")
			pin_label = words("Pinned sources: " + (", ".join(pins) if not pins.is_empty() else "none"), 17)
			feedback = words("The review request is already in your notebook." if rules.request_issued else "Present both relevant passages and an explanation.", 18)
			button("The account is authentic; its operator is not established.", func(): present_finding("scope"))
			button("The verification proves that Mara was replaced.", func(): present_finding("replacement"))
			button("Hear the Oracle · transcript below", play_oracle)
			var transcript = words("Oracle: " + ORACLE_WORDS, 17)
			transcript.hide()
			button("Show / hide Oracle transcript", func(): transcript.visible = not transcript.visible)
		"credential":
			words("SERVICE REVIEW", 28)
			words("This display separates two authorities. An account badge validates account credentials. A source-review request authorizes a bounded provenance review.")
			button("Present the account badge", func(): present_credential("account_badge"))
			button("Present the source-review request", func(): present_credential("review_request"))
			feedback = words("Inspect the scope before treating a seal as permission.")
		"video":
			words("PORCHLIGHT / THE RETURN", 27)
			words("Fictional adaptation from Mara's returned presence. Its polish is a lead, not proof of reconstruction.", 17)
			var frame = TextureRect.new()
			frame.custom_minimum_size = Vector2(0, 215)
			frame.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
			frame.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
			frame.texture = video_view.get_texture()
			body.add_child(frame)
			video_position = words("Ready", 15)
			button("Play / pause", toggle_video)
			for cue in cues:
				button("Replay %.0fs — %s" % [cue.start, cue.text], func(): play_cue(cue.start))
			feedback = words("Transcript and visual equivalent", 20)
			for cue in cues:
				words("[%.1fs] %s" % [cue.start, cue.text], 17)
			words("Visual description: a vertical Porchlight return post presents a polished public account. Platform framing and performance are representations, not independent witnesses.", 17)
		"journal":
			words("YOUR NOTEBOOK", 30)
			words("Pinned passages: " + (", ".join(pins) if not pins.is_empty() else "none"))
			words("D1 — Account verification does not establish who operates the account.\nSource-review request issued: public summary + verification scope. No family context included." if rules.request_issued else "No supported finding yet. Compare the summary with the public verification scope.")
			words("Reading route", 20)
			for destination in ["summary", "scope", "oracle", "video", "credential"]:
				button(destination.capitalize(), func(): open_page(destination))
		"pause", "exit":
			words("TAKE A MOMENT", 30)
			words("The camera is released and media is paused. This early encounter does not yet save investigation progress.")
			var reduced = CheckButton.new()
			reduced.text = "Reduce ambient motion"
			reduced.button_pressed = not world.motion_enabled
			reduced.toggled.connect(func(value: bool): world.motion_enabled = not value)
			body.add_child(reduced)
			button("Return to the entrance if stuck", func():
				player.position = Vector3(0, 0.05, 5)
				player.rotation = Vector3.ZERO
				player.look_angle = 0
				player.camera.rotation = Vector3.ZERO
				close_page())
			button("Restart encounter" if OS.has_feature("web") else "Exit to desktop", exit_encounter)
	if id != "welcome":
		button("Return to the room", close_page)
	for child in body.get_children():
		if child is Button:
			child.grab_focus()
			break

func present_finding(claim: String) -> void:
	var result = rules.submit(pins, claim)
	if is_instance_valid(pin_label): pin_label.text = "Pinned sources: " + ", ".join(pins)
	feedback.text = result.message
	if result.ok:
		world.reveal_gap()
		status.text = "THE ORACLE    ·    A gap acknowledged. A review requested."
		feedback.text += "\nThe Oracle leaves one space unfilled. Your notebook holds the request; the account badge has not changed."

func present_credential(credential: String) -> void:
	feedback.text = "AUTHORIZED: this request permits a review of the account presence's sources. It does not certify Mara's life or grant access to family context." if rules.can_review(credential) else "NOT AUTHORIZED: an account badge is not a source-review mandate. Obtain the Oracle's bounded request and present it here."

func close_page() -> void:
	_stop_media()
	page = ""
	panel.hide()
	player.set_active(true)

func exit_encounter() -> void:
	if OS.has_feature("web"):
		JavaScriptBridge.eval("window.location.reload()")
	else:
		get_tree().quit()

func _stop_media() -> void:
	if is_instance_valid(movie):
		movie.stop()
		movie.paused = false
	if is_instance_valid(speech):
		speech.stop()
		speech.stream_paused = false
	if is_instance_valid(captions): captions.text = ""

func toggle_video() -> void:
	speech.stop()
	if movie.stream == null:
		feedback.text = "Video unavailable. Use the complete transcript and visual description below; no clue is lost."
		return
	if not movie.is_playing():
		movie.play()
		movie.paused = false
	else:
		movie.paused = not movie.paused

func play_oracle() -> void:
	movie.stop()
	if speech.stream:
		speech.stream_paused = false
		speech.play()
	elif is_instance_valid(feedback):
		feedback.text = "Voice unavailable. The complete transcript is below."

func play_cue(time: float) -> void:
	speech.stop()
	if movie.stream == null:
		feedback.text = "Video unavailable. The matching transcript cue remains readable below."
		return
	movie.play()
	movie.stream_position = time
	movie.paused = false

func _notification(what: int) -> void:
	if what == NOTIFICATION_APPLICATION_FOCUS_OUT and is_instance_valid(player):
		if page.is_empty():
			open_page("pause")
		else:
			player.set_active(false)
			movie.paused = true
			speech.stream_paused = true

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		if page.is_empty(): open_page("pause")
		else: close_page()
		get_viewport().set_input_as_handled()
	elif event.is_action_pressed("journal"):
		open_page("journal")
		get_viewport().set_input_as_handled()
	elif event.is_action_pressed("interact") and page.is_empty() and not target.is_empty():
		open_page(target)
		get_viewport().set_input_as_handled()

func _process(_delta: float) -> void:
	if not is_instance_valid(player): return
	if OS.has_feature("web") and player.active and Input.mouse_mode != Input.MOUSE_MODE_CAPTURED:
		open_page("pause")
	if page.is_empty():
		var from = player.camera.global_position
		var query = PhysicsRayQueryParameters3D.create(from, from - player.camera.global_basis.z * 4.0)
		query.exclude = [player.get_rid()]
		var hit = get_world_3d().direct_space_state.intersect_ray(query)
		target = str(hit.collider.get_meta("station", "")) if not hit.is_empty() else ""
		prompt.text = "E  ·  Inspect " + target if not target.is_empty() else "Follow the sources. Leave room for uncertainty."
	else:
		prompt.text = ""
	if movie.is_playing() and not movie.paused:
		captions.text = ""
		for cue in cues:
			if movie.stream_position >= cue.start and movie.stream_position < cue.end:
				captions.text = cue.text
		if is_instance_valid(video_position): video_position.text = "%.1f seconds · replay any cue below" % movie.stream_position
	elif speech.playing:
		var position = speech.get_playback_position()
		if position < 3.3: captions.text = "Oracle: Mara Vale returned to public life."
		elif position < 6.4: captions.text = "Oracle: Her account remains authentic. The record is coherent."
		elif position < 11.0: captions.text = "Oracle: If you find a gap, bring me the sources."
		else: captions.text = "Oracle: I will leave room for what they cannot answer."
	elif not movie.is_playing():
		captions.text = ""

extends Node3D

var oracle: Node3D
var rings: Array[MeshInstance3D] = []
var leaves: Array[MeshInstance3D] = []
var solved: bool = false
var motion_enabled: bool = true
var clock: float = 0.0
var warm = Color("c79155")
var teal = Color("7ab8b3")

func material(color: Color, emission: float = 0.0, metallic: float = 0.0) -> StandardMaterial3D:
	var result = StandardMaterial3D.new()
	result.albedo_color = color
	result.roughness = 0.62
	result.metallic = metallic
	if emission > 0:
		result.emission_enabled = true
		result.emission = color
		result.emission_energy_multiplier = emission
	return result

func mesh(shape: Mesh, at: Vector3, surface: Material, parent: Node = self) -> MeshInstance3D:
	var result = MeshInstance3D.new()
	result.mesh = shape
	result.position = at
	result.material_override = surface
	parent.add_child(result)
	return result

func box(at: Vector3, size: Vector3, surface: Material, solid: bool = false, station: String = "") -> MeshInstance3D:
	var shape = BoxMesh.new()
	shape.size = size
	var result = mesh(shape, at, surface)
	if solid:
		var body = StaticBody3D.new()
		var collision = CollisionShape3D.new()
		var bounds = BoxShape3D.new()
		bounds.size = size
		collision.shape = bounds
		body.add_child(collision)
		result.add_child(body)
		if not station.is_empty():
			body.set_meta("station", station)
	return result

func label(text: String, at: Vector3, size: int = 34, color: Color = Color("e2ddd0")) -> void:
	var node = Label3D.new()
	node.text = text
	node.position = at
	node.font_size = size
	node.pixel_size = 0.0065
	node.modulate = color
	node.outline_size = 2
	node.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	add_child(node)

func lamp(at: Vector3, color: Color, energy: float, radius: float) -> void:
	var light = OmniLight3D.new()
	light.position = at
	light.light_color = color
	light.light_energy = energy
	light.omni_range = radius
	add_child(light)

func _ready() -> void:
	var environment = WorldEnvironment.new()
	var settings = Environment.new()
	settings.background_mode = Environment.BG_COLOR
	settings.background_color = Color("101b22")
	settings.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	settings.ambient_light_color = Color("738c98")
	settings.ambient_light_energy = 0.42
	settings.tonemap_mode = Environment.TONE_MAPPER_FILMIC
	settings.fog_enabled = true
	settings.fog_light_color = Color("35474c")
	settings.fog_density = 0.006
	settings.glow_enabled = true
	environment.environment = settings
	add_child(environment)
	var stone = material(Color("252e33"))
	var floor_mat = material(Color("384247"), 0, 0.25)
	var bronze = material(warm, 0, 0.5)
	box(Vector3(0, -0.15, 0), Vector3(14, 0.3, 18), floor_mat, true)
	box(Vector3(0, 3, -8), Vector3(14, 6, 0.4), stone, true)
	box(Vector3(-7, 3, 0), Vector3(0.4, 6, 18), stone, true)
	box(Vector3(7, 3, 0), Vector3(0.4, 6, 18), stone, true)
	box(Vector3(0, 3, 9), Vector3(14, 6, 0.4), stone, true)
	box(Vector3(0, 6, 0), Vector3(14, 0.3, 18), stone)
	for x in [-5.5, -2.8, 0.0, 2.8, 5.5]:
		box(Vector3(x, 0.006, -0.5), Vector3(0.025, 0.01, 16), bronze)
	for z in range(-7, 9, 2):
		box(Vector3(0, 0.008, z), Vector3(13, 0.01, 0.018), bronze)
	for x in [-6.0, 6.0]:
		for z in [-6.0, -1.0, 4.0]:
			box(Vector3(x, 2.5, z), Vector3(0.4, 5, 0.5), bronze)
			box(Vector3(x, 3.0, z + 0.28), Vector3(0.06, 2.2, 0.03), material(warm, 2))
			lamp(Vector3(x * 0.85, 3.2, z), warm, 1.8, 5)
	lamp(Vector3(0, 4, -3), teal, 4, 9)
	lamp(Vector3(0, 3, 6), Color("e1c49b"), 2, 8)
	label("THE ORACLE", Vector3(0, 4.5, -6.9), 64, warm)
	label("Every account wants an ending.", Vector3(0, 3.98, -6.8), 28)
	oracle = Node3D.new()
	oracle.position = Vector3(0, 0, -4.5)
	add_child(oracle)
	var torso = CylinderMesh.new()
	torso.top_radius = 0.42
	torso.bottom_radius = 0.75
	torso.height = 1.9
	mesh(torso, Vector3(0, 1.8, 0), material(Color("16292d"), 0, 0.65), oracle)
	var head = SphereMesh.new()
	head.radius = 0.32
	head.height = 0.64
	mesh(head, Vector3(0, 3.03, 0), material(Color("bcb8a1"), 0.12, 0.5), oracle)
	for x in [-0.13, 0.13]:
		var eye = SphereMesh.new()
		eye.radius = 0.025
		eye.height = 0.05
		mesh(eye, Vector3(x, 3.07, 0.30), material(teal, 3), oracle)
	for i in range(3):
		var ring = TorusMesh.new()
		ring.inner_radius = 0.8 + i * 0.32
		ring.outer_radius = ring.inner_radius + 0.025
		var visual = mesh(ring, Vector3(0, 2.7, 0), material(warm, 0.7, 0.6), oracle)
		visual.rotation_degrees.x = 78 + i * 15
		rings.append(visual)
	for i in range(7):
		var leaf = BoxMesh.new()
		leaf.size = Vector3(0.30, 0.48, 0.025)
		var angle = float(i) / 7.0 * TAU
		var visual = mesh(leaf, Vector3(cos(angle) * 1.5, 2 + sin(angle) * 0.8, 0.3), material(teal, 0.35), oracle)
		visual.rotation.z = -angle * 0.2
		leaves.append(visual)
	box(Vector3(0, 0.5, -3.3), Vector3(2.4, 1, 1.2), material(Color("283d41")), true, "oracle")
	label("PRESENT YOUR FINDING", Vector3(0, 1.25, -2.7), 24, teal)
	station(Vector3(-3.2, 0, 0.5), "summary", "01  /  THE PUBLIC SUMMARY", "A coherent return", warm)
	station(Vector3(3.2, 0, 0.5), "scope", "02  /  VERIFICATION SCOPE", "What the badge can prove", teal)
	station(Vector3(3.7, 0, -4.7), "credential", "03  /  SERVICE REVIEW", "Authority has a boundary", warm)
	box(Vector3(-3.7, 1.9, -3.6), Vector3(1.75, 2.85, 0.3), material(Color("0c1014")), true, "video")
	label("PORCHLIGHT  /  THE RETURN", Vector3(-3.7, 3.6, -3.45), 23, teal)
	box(Vector3(0, 2.0, 8.5), Vector3(2.6, 4, 0.25), bronze, true, "exit")
	label("RETURN TO DESKTOP", Vector3(0, 2.7, 8.2), 30, teal)

func station(at: Vector3, id: String, title: String, subtitle: String, color: Color) -> void:
	box(at + Vector3(0, 0.55, 0), Vector3(1.7, 1.1, 0.9), material(Color("192a31")), true, id)
	var page = box(at + Vector3(0, 1.12, 0), Vector3(1.5, 0.035, 0.72), material(color, 0.1))
	page.rotation_degrees.x = 12
	label(title, at + Vector3(0, 1.95, 0), 22, color)
	label(subtitle, at + Vector3(0, 1.6, 0), 18)

func _process(delta: float) -> void:
	if not motion_enabled:
		return
	clock += delta
	if is_instance_valid(oracle):
		oracle.position.y = sin(clock * 0.7) * 0.04
	for i in range(rings.size()):
		rings[i].rotation.y += delta * (0.07 + i * 0.025)
	for i in range(leaves.size()):
		leaves[i].visible = not solved or i != 1
		leaves[i].position.z = 0.3 + sin(clock + i) * 0.07

func reveal_gap() -> void:
	solved = true
	leaves[1].visible = false

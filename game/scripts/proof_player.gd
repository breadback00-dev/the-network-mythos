extends CharacterBody3D

var camera: Camera3D
var active: bool = false
var sensitivity: float = 0.0022
var look_angle: float = 0.0

func _ready() -> void:
	var collider = CollisionShape3D.new()
	var capsule = CapsuleShape3D.new()
	capsule.radius = 0.30
	capsule.height = 1.75
	collider.shape = capsule
	collider.position.y = 0.9
	add_child(collider)
	camera = Camera3D.new()
	camera.position.y = 1.58
	camera.fov = 72
	camera.near = 0.08
	add_child(camera)
	camera.current = true

func _unhandled_input(event: InputEvent) -> void:
	if active and event is InputEventMouseMotion:
		rotate_y(-event.relative.x * sensitivity)
		look_angle = clampf(look_angle - event.relative.y * sensitivity, -1.2, 1.2)
		camera.rotation.x = look_angle

func _physics_process(delta: float) -> void:
	var direction = Vector3.ZERO
	if active:
		var movement = Input.get_vector("move_left", "move_right", "move_forward", "move_back")
		direction = (transform.basis * Vector3(movement.x, 0, movement.y)).normalized()
	velocity.x = move_toward(velocity.x, direction.x * 3.0, delta * 15.0)
	velocity.z = move_toward(velocity.z, direction.z * 3.0, delta * 15.0)
	if not is_on_floor():
		velocity.y -= 14 * delta
	else:
		velocity.y = 0
	move_and_slide()

func set_active(value: bool) -> void:
	active = value
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED if value else Input.MOUSE_MODE_VISIBLE
	if not value:
		velocity.x = 0
		velocity.z = 0

extends SceneTree

const Rules = preload("res://scripts/proof_rules.gd")
var failures: int = 0

func expect(condition: bool, message: String) -> void:
	if not condition:
		failures += 1
		push_error(message)

func _initialize() -> void:
	var rules = Rules.new()
	expect(not rules.submit(["summary"], "scope").ok, "A summary alone cannot establish D1")
	expect(not rules.submit(["summary", "summary"], "scope").ok, "Copies do not corroborate")
	expect(not rules.submit(["summary", "scope"], "replacement").ok, "D1 cannot establish reconstruction")
	expect(not rules.submit(["voice", "scope"], "scope").ok, "Voice difference is not proof")
	expect(not rules.can_review("account_badge"), "An account badge does not authorize source review")
	expect(not rules.can_review("review_request"), "An unissued request cannot authorize review")
	expect(rules.submit(["scope", "summary"], "scope").ok, "Source order must not matter")
	expect(rules.request_issued, "The supported finding issues a request")
	expect(rules.can_review("review_request"), "The request authorizes a review")
	expect(not rules.can_review("account_badge"), "The badge's scope remains unchanged")
	expect(rules.submit(["summary", "scope"], "scope").ok, "Repeat inspection is safe")
	expect(rules.request_count == 1, "Repeated deduction cannot duplicate requests")
	expect(not rules.submit(["summary", "scope"], "replacement").ok, "Later invalid claims still fail")
	expect(rules.request_issued, "Later mistakes cannot erase a supported discovery")
	print("RULES RESULT: %d failures; evidence limits, acquisition order, request authority and idempotency" % failures)
	quit(1 if failures > 0 else 0)

extends RefCounted

var request_issued: bool = false
var request_count: int = 0

func submit(sources: Array, claim: String) -> Dictionary:
	if not sources.has("summary") or not sources.has("scope"):
		return {"ok": false, "message": "Compare the public summary with the verification scope. A voice, badge or copied summary cannot supply that missing connection."}
	if claim != "scope":
		return {"ok": false, "message": "These sources limit what verification proves. They do not establish reconstruction, death, or who is operating the account."}
	if not request_issued:
		request_issued = true
		request_count += 1
	return {"ok": true, "message": "Supported: an authentic account does not establish who operates it. The Oracle has issued a source-review request."}

func can_review(credential: String) -> bool:
	return credential == "review_request" and request_issued

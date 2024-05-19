export function isCharInWord(guess, ans) {
    for (let i = 0; i < ans.length; i++) {
		if (guess === ans[i]) {
			return true;
		}
	}
	return false;
}

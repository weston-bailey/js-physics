module.exports = element => {
	while (element.firstChild) {
		element.removeChild(element.firstChild)
	}
	return element
}

document.getElementById("options").addEventListener("change", function() {
	if (this.value)
		this.form.submit();
});

document.getElementById("btn").addEventListener("click", function() {
    fetch("http://127.0.0.1:5000/run-python")
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error("Error:", error));
});

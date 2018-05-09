var fruits = ["Banana", "Orange", "Apple", "Mango"];
document.getElementById("demo").innerHTML = fruits;

setInterval(
function myFunction() {
    var last = fruits.pop();
    document.getElementById("demo").innerHTML = fruits;
    console.log(last)
    document.getElementById("f").innerHTML = last;

}, 1000)

<script>
var fruits = ["Banana", "Orange", "Apple", "Mango"];
document.getElementById("demo").innerHTML = fruits;

setInterval(
function myFunction() {
    var last = fruits.pop();
    while(fruits.length > 0) {
      var last = fruits.pop();
    }
    document.getElementById("demo").innerHTML = fruits;
    console.log(last)
    document.getElementById("f").innerHTML = last;

}, 1000)
</script>

</body>
</html>

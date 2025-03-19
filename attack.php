<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    

<button id='attack_button'>Aanvallen</button>


<script>
let attack_button = document.getElementById('attack_button');

attack_button.addEventListener('click', function(){
    console.log('Aanval');
})
</script>

</body>
</html>
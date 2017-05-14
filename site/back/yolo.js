minify('tochange.js.js', function(error, data) {
    if (error)
        console.error(error.message);
    else
        console.log(data);
});

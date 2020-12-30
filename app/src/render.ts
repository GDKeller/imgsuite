const checkboxTrim = document.getElementById('check_trim');
console.log('checkbox:', checkboxTrim)




// File Drop
document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('File dropped');

    var files = event.dataTransfer.files;
    var file;
    console.log(files);

    for (var i = 0; i < files.length; i++) {

        // get item
        file = files.item(i);
        //or
        file = files[i];


        // @ts-ignore
        processFiles({
            'path': file.path,
            'name': file.name
        })

        // console.log('File Name:', file.name);
        // console.log('File Path:', file.path);
    }


});


document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
    // console.log('File is in the Drop Space');
});

document.addEventListener('dragleave', (event) => {
    // console.log('File has left the Drop Space');
});

let droparea = document.getElementById('droparea');
let buttonRun = document.getElementById('button_process');
let filesList = document.getElementById('files-list');

// @ts-ignore
var filesArray = {};
let filesArrayCount = 0;

// @ts-ignore
let files;
// @ts-ignore
let file;


// File Drop
droparea.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    droparea.classList.remove('hover');
    droparea.classList.add('finished');
    console.log('File dropped');

    files = event.dataTransfer.files;
    console.info(files);
    // var file;
    // console.log(files);

    let inArray = false;

    for (var i = 0; i < files.length; i++) {
        file = files.item(i);
        file = files[i];



        for (var n = 0; n < filesArrayCount; n++) {

            console.log(file.path)
            // @ts-ignore
            if (filesArray[n].path == file.path) {
                inArray = true;
            }
        }


        // @ts-ignore
        console.log(inArray)

        // @ts-ignore
        if (inArray == true) {
            console.info('duplicate!')
        } else {
            console.info('new file')

            // @ts-ignore
            filesArray[filesArrayCount] = {'path': file.path, 'name': file.name};
            // console.log(filesArray);
            let li = document.createElement('li');
            filesList.appendChild(li);
            li.innerText = file.path;
            filesArrayCount++;
        }


        // @ts-ignore

        // let li = document.createElement('li');
        // filesList.appendChild(li);
        // li.innerText = 'Duplicate!', file.path;



    }


    setTimeout(function () {
        droparea.classList.remove('finished');
    }, 100)


});

buttonRun.addEventListener('click', function () {
    // @ts-ignore
    console.log(filesArray);

    let checkboxResize = document.getElementById('check_resize');
    // @ts-ignore
    let checkboxResizeState = checkboxResize.checked;

    // @ts-ignore
    let resizeWidth = parseInt(document.getElementById('input_width').value);
    console.log('width:', resizeWidth);


    let checkboxTrim = document.getElementById('check_trim');
    // @ts-ignore
    let checkboxTrimState = checkboxTrim.checked;

    for (var i = 0; i < filesArrayCount; i++) {

        // @ts-ignore
        file = filesArray[i];

        // @ts-ignore
        processFiles({
            'path': file.path,
            'name': file.name,
            'trim': checkboxTrimState,
            'resize': {
                'shouldResize': checkboxResizeState,
                'width': resizeWidth,
            }
        })
    }
});


droparea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('Dragover')
});

droparea.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space');
    droparea.classList.add('hover');
});

droparea.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
    droparea.classList.remove('hover');
});

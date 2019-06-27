let search_bar = document.querySelector('.search_bar');
let clearBtn = document.querySelector('.clearBtn');
let table_output = document.querySelector('.output');
let debug = 0;


function api(par, type) {
    setTimeout(function(){
        let url = "search.php?";
        type == 'c' ? url += 'c='+par : url += 'q='+par;

        $.ajax({
            type: "GET",
            datatype: "json",
            url: url

        }).done(function(json) {
            console.log(json);
            !json ? table_output.innerHTML = '' : responseTable(JSON.parse(json), type);

        }).fail(function(e) {
            console.error('Error: brokko | '+e);
            return;
        });
    }, 0.001);
}

function responseTable(obj, type = null) {
    table_output.innerHTML = '';
    let html = '';
    if (type != 'c') {
        let a = [];

        for (let i in obj) {
            a.push(obj[i].Code);
            html += `<li class='`+obj[i].Code+`'>`+obj[i].Name+`</li>`;
        }
        table_output.innerHTML = html;

        for (let i = 0; i < a.length; i++) {
            a[i] = document.querySelector('.'+a[i]);
            a[i].addEventListener('click', ()=>{api(a[i].innerHTML, 'c');});
        }

    } else {
        for (let i in obj) {
            for (let key in obj[i]) {
                html += `<li class='info'>`+key+' : '+obj[i][key]+`</li>`;
            }
        }

        table_output.innerHTML = html;
    }
}

clearBtn.addEventListener('click', ()=> {
    search_bar.value = '';
    api('');
});

search_bar.addEventListener('click', ()=> {
    search_bar.value = '';
    api('');
});
search_bar.addEventListener('keyup', ()=> {api(search_bar.value, 'q');});

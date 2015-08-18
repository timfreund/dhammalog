var catalog = null;

function playTalk(talk_id){
    var player = $('#player')[0];
    var talk = catalog[talk_id];
    player.pause();
    player.src = talk['link'];
    player.play();
    talk['play_count'] = talk['play_count'] + 1;
    $('#play_count-' + talk_id)[0].innerHTML = talk['play_count'];
    $('#trackinfo')[0].innerHTML = talk['title'] + " (" + talk['link'] + ")";
    localStorage.setItem('eveningtalks', JSON.stringify(catalog));
}

function populateTalkTable() {
    catalog = JSON.parse(localStorage.getItem('eveningtalks'));
    if(catalog == null){
        retrieveCatalog();
        return;
    }

    var ids = Object.keys(catalog);
    ids.sort();
    ids.reverse();
    ids.map(function(talk_id) {
        var talk = catalog[talk_id];
        $('#talktable tr:last').after('<tr><td>' + talk_id + '</td><td>' + talk['title'] + '</td><td id="play_count-' + talk_id + '">' + talk['play_count'] + '</td><td><button onclick="playTalk(' + talk_id + ')">Play</button></td><td>' + talk['rating'] + '</td></tr>');
    });
}

function retrieveCatalog(){
    $.getJSON("/eveningtalks.json", function(data) {
        $.each(data, function(key, val) {
            val['play_count'] = 0;
            val['rating'] = 0;
        });
              
        localStorage.setItem('eveningtalks', JSON.stringify(data));
        populateTalkTable();
    });
}

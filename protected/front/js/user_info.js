loadUserInfo();

function loadUserInfo() {
    $.getJSON('/protected/api/idPayload', function (id_token) {
		$('#username').html(id_token.name);
        //console.log(id_token);
		//$('#idTokenPayload').jsonViewer(id_token, {collapsed: false});
	});
}
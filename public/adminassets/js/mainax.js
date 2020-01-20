function ajaxmodel(url, type, data = '', button = null, self = null, model = null, loader = null, property=null) {
    if (button != null) {
        var l = Ladda.create(button);
        l.start();
    }
    if (self != null) {
        self.$Progress.start();
        if (loader != null) {
            self.$store.commit('loaderval',{type:loader,val: true});
        }
    }
    axios({
            method: type,
            url: url,
            data: data,
            headers: {
                'APP-TOKEN': '1l23f134b1'
            }
        })
        .then((response) => {
            if (response.data.hasOwnProperty('errors')) {
                $("#errorsdiv").html(makeerrors(response.data.errors));
                $("#errorsdiv").css({
                    display: 'block'
                });
                if (self != null) self.$Progress.fail();
            }
            if (response.data.hasOwnProperty('msg')) {
                if (response.data.msg.type == 'success' && !response.data.hasOwnProperty('url')) {
                    if (response.data.hasOwnProperty('data')){
                        self.data = response.data.data;
                    }
                }
                showbtnflag = true;
                if (response.data.hasOwnProperty('refresh')) {
                    if (response.data.refresh == true) {
                        showbtnflag = false;
                    }
                }
                if (model != null) {
                    model.modal('hide');
                }
                swal({
                    title: response.data.msg.type,
                    type: response.data.msg.type,
                    text: response.data.msg.msg,
                    showConfirmButton: showbtnflag
                });
            } else if (response.data.hasOwnProperty('data')) {
                self.data = response.data.data
                if (model != null) {
                    model.modal('hide');
                }
            }
            if(response.data.hasOwnProperty('property')){
                if(property !=null){
                    self[property] = response.data.property;
                }
            }
            if (response.data.hasOwnProperty('auth')) {
                if (self != null) {
                    self.$session.set('auth', response.data.auth);
                }
            }
            if (response.data.hasOwnProperty('url')) {
                location.assign(response.data.url);
            }
            if (response.data.hasOwnProperty('refresh')) {
                if (response.data.refresh == true) {
                    location.reload();
                }
            }
            if(response.data.hasOwnProperty('mounted')){
                self.__mounted();
            }
        })
        .catch((error) => {
            swal({
                title: 'error',
                type: 'error',
                text: error,
                showConfirmButton: true
            });
            if (self != null) self.$Progress.fail();
        })
        .then(() => {
            if (button != null) l.stop();
            if (self != null) {
                self.$Progress.finish();
                if (loader != null) {
                    self.$store.commit('loaderval',{type:loader,val: false});
                }
            }
        });
}
function makeerrors(errors) {
    html = '<div class="alert alert-dismissible alert-danger">' +
        '<div class="close" data-dismiss="alert">&times;</div>';
    $.each(errors, function(index, val) {
        html += val + "<br>";
    });
    html += '</div>';
    return html;
}

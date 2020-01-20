function ajaxaj(url, type, data = '', button = null, self = null, model = null, loader = null) {
    if (button != null) {
        var l = Ladda.create(button);
        l.start();
    }
    if (self != null) {
        self.$Progress.start();
        if (loader != null) {
            self[loader] = true;
        }
    }
    var processData;
    var contentType;
    if (typeof(data) !== 'string') {
        processData = false;
        contentType = false;
    }
    $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'APP-TOKEN': '1l23f134b1'
            },
            processData: processData,
            contentType: contentType,
            type: type,
            url: url,
            data: data
        })
        .done(function(data) {
            if (data.hasOwnProperty('errors')) {
                $("#errorsdiv").html(makeerrors(data.errors));
                $("#errorsdiv").css({
                    display: 'block'
                });
                if (self != null) self.$Progress.fail();
            }
            if (data.hasOwnProperty('msg')) {
                if (data.msg.type == 'success' && !data.hasOwnProperty('url')) {
                    self.data = data.data;
                }
                showbtnflag = true;
                if (data.hasOwnProperty('refresh')) {
                    if (data.refresh == true) {
                        showbtnflag = false;
                    }
                }
                if (model != null) {
                    model.modal('hide');
                }
                swal({
                    title: data.msg.type,
                    type: data.msg.type,
                    text: data.msg.msg,
                    showConfirmButton: showbtnflag
                });
            } else if (data.hasOwnProperty('data')) {
                self.data = data.data
                if (model != null) {
                    model.modal('hide');
                }
            }
            if (data.hasOwnProperty('auth')) {
                if (self != null) {
                    self.$session.set('auth', data.auth);
                }
            }
            if (data.hasOwnProperty('url')) {
                location.assign(data.url);
            }
            if (data.hasOwnProperty('refresh')) {
                if (data.refresh == true) {
                    location.reload();
                }
            }
        })
        .fail(function(error) {
            swal({
                title: 'error',
                type: 'error',
                text: error,
                showConfirmButton: true
            });
            if (self != null) self.$Progress.fail();
        })
        .always(function() {
            if (button != null) l.stop();
            if (self != null) {
                self.$Progress.finish();
                if (loader != null) {
                    self[loader] = false;
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

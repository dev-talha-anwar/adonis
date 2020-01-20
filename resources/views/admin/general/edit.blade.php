@extends('adminviews.layouts.layout')
@section('pagecss')
<link href="{{asset('adminassets')}}/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
@endsection
@section('content')
<div class="page-content-wrapper">
  <!-- BEGIN CONTENT BODY -->
  <div class="page-content">
    <!-- BEGIN PAGE BASE CONTENT -->
    <div class="row">
      <div class="col-md-12">
        <div class="portlet box purple ">
          <div class="portlet-title">
            <div class="caption">
              <i class="fa fa-gift"></i> Change General Settings </div>
            </div>
            <div class="portlet-body form">
              <div class="" id="errorsdiv" style="display: none;"></div>
              <form action="#" class="form-horizontal form-bordered updategeneralform" >
                <div class="form-body">
                  <div class="form-group last">
                    <label class="control-label col-md-3">Logo</label>
                    <div class="col-md-9">
                      <div class="fileinput fileinput-new" data-provides="fileinput">
                        <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                          <img src="{{Storage::disk('public')->url($general->logo)}}" alt=""> </div>
                          <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"> </div>
                          <div>
                            <span class="btn default btn-file">
                              <span class="fileinput-new"> Select image </span>
                              <span class="fileinput-exists"> Change </span>
                              <input type="file" name="logo"> </span>
                              <a href="javascript:;" class="btn red fileinput-exists" data-dismiss="fileinput"> Remove </a>
                            </div>
                          </div>

                        </div>
                      </div>
                      @foreach(json_decode($general->social_links) as $key => $value)
                      <div class="form-group last">
                        <label class="control-label col-md-3">{{$key}}</label>
                        <div class="col-md-9 form-group form-md-line-input has-success">
                          <input type="text" class="form-control border-purple" placeholder="{{$key}}" name="{{$key}}" value="{{$value}}">
                        </div>
                      </div>
                      @endforeach
                    </div>
                    <div class="form-actions">
                      <div class="row">
                        <div class="col-md-offset-3 col-md-9">
                          <button id="submitbtn" type="button" class="btn purple uppercase mt-ladda-btn ladda-button" data-style="zoom-in">
                            <span class="ladda-label">
                              <i class="glyphicon glyphicon-saved"></i>
                              Update
                            </span>
                            <span class="ladda-spinner"></span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- END PAGE BASE CONTENT -->
          </div>
          <!-- END CONTENT BODY -->
        </div>
        <!-- END CONTENT -->
        @endsection
        @section('pagejs')
        <script src="{{asset('adminassets')}}/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>
        <script>
          $(function(){
            $('form input').keydown(function (e) {
              if (e.keyCode == 13) {
                e.preventDefault();
                $("#submitbtn").click();
              }
            });
            $('#submitbtn').on('click',function(e){
              var form = $('.updategeneralform')[0];
              var formData = new FormData(form);
              ajax("{{route('general.update')}}",'POST',formData,this);
            });
          });
        </script>
        @endsection
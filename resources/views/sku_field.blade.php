<div class="{{$viewClass['form-group']}}">

    <label for="{{$id ?? ''}}" class="{{$viewClass['label']}} control-label">{{ $label }}</label>

    <div class="{{$viewClass['field']}}">
        <div class="sku_warp {{$class}}">
            <input type="hidden" class="Js_sku_input" name="{{$name}}" {!! $attributes !!}>
            <input type="hidden" class="Js_sku_params_input" value="{{ json_encode($value) }}">
            <div class="sku_attr_key_val checkbox-render">

            </div>
            <!-- 操作SKU -->
            <div class="sku_edit_warp" style="margin-bottom: 20px">
                <table class="table table-bordered" id="table">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="not_sku_attr_key_val checkbox-render">

            </div>

        </div>

    </div>
</div>

<style>
    .has_error .checkbox, .has_error .checkbox-inline, .has_error.checkbox label, .has_error .control-label, .has_error .form-control-position i, .has_error .form-control:focus~.form-control-position i, .has_error .help-block, .has_error .radio, .has_error .radio-inline, .has_error.radio label {
        color: #bd4147;
    }
    .sku_warp .sku_edit_warp .Js_sku_del_pic {
        color: {{  Admin::color()->get('cyan') }};
    }

    .sku_warp .sku_edit_warp .Js_sku_upload {
        border: 1px solid{{ Admin::color()->get('input-border') }};
        color: {{ Admin::color()->get('dark70') }};
    }

    .sku_warp .sku_edit_warp tr td  .icon-x{
        color: {{ Admin::color()->get('danger') }};
    }

    .checkbox-wrp{
        margin-right:30px;
        display:flex;
        justify-content: flex-start;
    }

    .get-config-size-wrap{
        position:relative;
    }
    .size-select-list{
        color: #757575;
        text-align: left;
        width: 100px;
        background: #fff;
        border: 1px solid #dbe3e6;
        position: absolute;
        top: 33px;
        left: 0;
        margin:0;
        padding:0;
        z-index: 9999;
        display: none;
    }
    .size-select-list li{
        padding: 0 5px;
        height: 30px;
        line-height: 30px;
        width: 98px;
    }
    .size-select-list li:hover{
        color: #fff;
        background: #1e9fff;
    }
    .size-set{
        min-width:70px;
    }
</style>

(function () {
    // 上传地址
    let UploadHost,
        product_skus,
        oldSku;
    function SKU() {
        this.params = JSON.parse($('.Js_sku_params_input').val());
        console.log(this.params)
        UploadHost = this.params.img_upload_url;
        oldSku = this.params.product_property;
        product_skus = this.params.product_skus;
        this.init();
    }

    const uploadImageButton = '<i class="feather icon-upload-cloud"></i>';
    const deleteImageButton = '<i class="feather icon-x"></i>';

    SKU.prototype.init = function () {
        let _this = this;
        //处理销售属性
        _this.SKUForm();

        // SKU图片上传
        $('.sku_edit_warp tbody').on('click', '.Js_sku_upload', function () {
            const input = $(this).parent().find('input');
            if (input.val() === '') {
                _this.upload($(this));
            } else {
                input.val('');
                $(this).css('background-image', 'none').html(uploadImageButton);
                _this.processSku();
            }
        });

        $('.sku_edit_warp tbody').on('mouseenter', '.Js_sku_upload', function () {
            if ($(this).html() === '') {
                $(this).html(deleteImageButton)
            }
        });

        $('.sku_edit_warp tbody').on('mouseleave', '.Js_sku_upload ', function () {
            if ($(this).html() === deleteImageButton) {
                $(this).html('')
            }
        });

        //批量设置价格库存
        $('.sku_edit_warp').on('focusout','.multi', function () {
            let value = $(this).val(),
                select_color = $(this).parents('tr').find('#color-select option:selected').val(),
                field = $(this).parent().attr('data-field');
            if(select_color !== ''){
                $('.sku_edit_warp tbody td').each(function () {
                    let data_color = $(this).parents('tr').find('.color').text();
                    if($(this).attr('data-field') === field && data_color === select_color){
                        $(this).find('input').val(value);
                    }
                })
            }else{
                $('.sku_edit_warp tbody td').each(function () {
                    if($(this).attr('data-field') === field){
                        $(this).find('input').val(value);
                    }
                })
            }

            $(this).val('');
            _this.processSku();
        });

        //单个价格
        $('.sku_edit_warp tbody').on('focusout','.form-control', function () {
            _this.processSku();
        })

        //获取配置的尺码
        $('.sku_edit_warp').on('dblclick','.get-config-size', function () {
            let domain = $('#domain').attr('data-site'),
                sizeSelectOption = '',
                sku_size = [];

            $('.sku_attr_key_val .row').each(function (){
                let that = $(this),
                    key = that.find('label').text();
                that.find('input').each(function (){
                    if($(this).prop('checked') && key === '尺码'){
                        sku_size.push($(this).attr('data-text'));
                    }
                });
            });

            sizeSelectOption = _this.multiConfig(domain,sku_size);

            $(this).parent().find('.size-select-list').html(sizeSelectOption).show();
        })
        $(document).click(function () {
            $(".size-select-list").hide();
        });
        $(document).on('click','.size-select-list li',function () {
            $(this).parents('.get-config-size-wrap').find('.get-config-size').val($(this).text()).attr('data',$(this).attr('data-value'));
            $(this).parent().hide();
        });

        //批量设置自定义尺码价格
        $('.sku_edit_warp').on('click','.size-set',function () {
            let that = $(this),
                data_type = that.attr('data-type'),
                size = that.parents('th').find(".get-config-size").val(),
                size_price = parseFloat(that.parents('th').find(".get-config-price").val()),
                site = $('#domian').attr('data-site'),
                select_color = that.parents('tr').find('#color-select option:selected').val();
            if(site === 'juyi5'){ //S,M,L M,L,XL,2XL,3XL XL,2XL,3XL,4XL XL,2XL,3XL,4XL,5XL 均码
                if(size.indexOf('-') > -1){
                    var arr = that.parents('th').find(".get-config-size").attr('data-value').split(',');
                    if(select_color !== ''){
                        $('.sku_edit_warp tbody').find('.' + data_type).each(function () {
                            let _that = $(this),
                                data_color = _that.parents('tr').find('.color').text(),
                                limit = _that.parents('tr').find('.size').text();
                            if(data_color === select_color && $.inArray(limit,arr) > -1){
                                _that.val(size_price);
                            }
                        });
                    }else{
                        $('.sku_edit_warp tbody').find('tr').each(function () {
                            let _that = $(this);
                            let limit = _that.find('.size').text();
                            if($.inArray(limit,arr) > -1){
                                _that.find('.' + data_type).val(size_price);
                            }
                        });
                    }
                }else{
                    if(select_color !== ''){
                        $('.sku_edit_warp tbody').find('.' + data_type).each(function () {
                            let _that = $(this),
                                data_color = _that.parents('tr').find('.color').text(),
                                limit = _that.parents('tr').find('.size').text();
                            if(data_color === select_color && limit == size){
                                _that.val(size_price);
                            }
                        });
                    }else{
                        $('.sku_edit_warp tbody').find('tr').each(function () {
                            let _that = $(this);
                            let limit = _that.find('.size').text();
                            if(limit == size){
                                _that.find('.' + data_type).val(size_price);
                            }
                        });
                    }
                }
            }else{
                //尺码价格限制 k2 2tong xingfujie bao66
                if(size.indexOf('-') > -1){
                    let size_min = size.split('-')[0];
                    let size_max = size.split('-')[1];
                    if(select_color !== ''){
                        $('.sku_edit_warp tbody').find("."+ data_type).each(function () {
                            let _that = $(this),
                                data_color = _that.parents('tr').find('.color').text(),
                                limit = _that.parents('tr').find('.size').text();
                            if(data_color === select_color && limit >= size_min && limit <= size_max){
                                _that.val(size_price);
                            }
                        });
                    }else{
                        $('.sku_edit_warp tbody').find('tr').each(function () {
                            let _that = $(this);
                            let limit = _that.find('.size').text();
                            if( limit >= size_min && limit <= size_max ){
                                _that.find("."+ data_type).val(size_price);
                            }
                        });
                    }
                }else{
                    if(select_color !== ''){
                        $('.sku_edit_warp tbody').find("."+ data_type).each(function () {
                            let _that = $(this);
                            let limit = _that.parents('tr').find('.size').text();
                            let data_color = _that.parents('tr').find('.color').text();
                            if(data_color === select_color && limit == size){
                                _that.val(size_price);
                            }
                        });
                    }else{
                        $('.sku_edit_warp tbody').find('tr').each(function () {
                            let _that = $(this);
                            let limit = $(this).find('.size').text();
                            if( limit == size){
                                _that.find("."+ data_type).val(size_price);
                            }
                        });
                    }
                }
            }

            that.parents('th').find(".get-config-size").val('');
            that.parents('th').find(".get-config-price").val('');
        });
    };
    // 生成具体的SKU配置表单
    SKU.prototype.SKUForm = function () {
        let _this = this;
        let sale_sku_body="<div class='form-group form-field' style='background: #f7f7f9;border-radius: 10px;padding: 10px'><label class='text-capitalize control-label' style='text-align: center;'>销售属性</label>"; //销售属性
        let sale_not_sku_body="<div class='form-group form-field' style='background: #f7f7f9;border-radius: 10px;padding: 10px'><label class='text-capitalize control-label' style='text-align: center;'>其它属性</label>";
        $.each(_this.params.properties,function (i,item){
            if(item.form_type == 'checkbox'){
                if(item.is_sale == 1){
                    sale_sku_body+=_this.createCheckBox(item);
                }else{
                    sale_not_sku_body+=_this.createCheckBox(item);
                }
            }
        });
        sale_sku_body += "</div>";
        sale_not_sku_body += "</div>";
        $('.sku_attr_key_val').html(sale_sku_body);
        $('.not_sku_attr_key_val').html(sale_not_sku_body);
        _this.skuSelect();
    };

    SKU.prototype.skuSelect = function (){
        let _this = this;
        //渲染老数据
        if(oldSku){
            let arr = oldSku.split(';');
            $.each(arr,function (index,val){
                $('.checkbox-render input').each(function (){
                    if($(this).val() === val){
                        $(this).prop('checked', true);
                    }
                })
            })

            //回填备注
            _this.backfillNote();

            _this.tableData();
        }

        $('.sku_attr_key_val').on('click','input[type="checkbox"]', function (){
            if(!$(this).prop('checked')){
                $(this).parents('.checkbox-wrp').find('.note').val('');
            }
            _this.tableData();
        });
        $('.not_sku_attr_key_val').on('click','input', function (){
            _this.processSku();
        });
    };

    SKU.prototype.backfillNote = function (){
        let notes = '';
        $.each(product_skus,function (index,val){
            if(val.note){
                notes += val.note.split(';') + ',';
            }
        })
        notes = notes.replace(/,$/gi,"");
        let notes_arr = [...new Set(notes.split(','))];
        $.each(notes_arr,function (index,val){
            let key = val.split('-')[0];
            let value = val.split('-')[1];
            $('.sku_attr_key_val input[type="checkbox"]').each(function (){
                if($(this).val() === key){
                    $(this).parents('.checkbox-wrp').find('.note').val(value);
                }
            });
        })
    };

    //获取选中的属性拼接数据'黑色|1:1 白色|1:2'
    SKU.prototype.tableData = function (){
        let _this = this,
            data = {};
        $('.sku_attr_key_val .row').each(function (){
            let that = $(this),
                arr = [],
                key = that.find('label').text();
            that.find('input').each(function (){
                let text = $(this).attr('data-text')+'|'+$(this).val();
                if($(this).prop('checked')){
                    arr.push(text);
                }
            });

            if(arr.length){
                data[key] = arr;
            }
        });
        _this.renderTable(data);

        if ($.isEmptyObject(data)) {
            $('.sku_edit_warp tbody').html(' ');
            $('.sku_edit_warp thead').html(' ');
            $('.Js_sku_input').val('');
        }
    };

    SKU.prototype.multiConfig = function (domain,sku_size){
        let html = '';
        switch(domain) {
            case 'k3':
                html = '<li>34-39</li>' +
                    '<li>34-40</li>' +
                    '<li>35-39</li>' +
                    '<li>35-40</li>' +
                    '<li>36-39</li>' +
                    '<li>36-40</li>' +
                    '<li>35-44</li>';
                break;
            case 'xingfujie':
                html = '<li>21-30</li>' +
                    '<li>26-36</li>' +
                    '<li>35-39</li>' +
                    '<li>35-40</li>' +
                    '<li>35-44</li>' +
                    '<li>36-44</li>' +
                    '<li>38-44</li>' +
                    '<li>39-44</li>';
                break;
            case 'juyi5':
                html = '<li data-value="S,M,L">S-L</li>' +
                    '<li data-value="S,M,L,XL">S-XL</li>' +
                    '<li data-value="M,L,XL,2XL,3XL">M-3XL</li>' +
                    '<li data-value="XL,2XL,3XL,4XL">XL-4XL</li>' +
                    '<li data-value="XL,2XL,3XL,4XL,5XL">XL-5XL</li>' +
                    '<li data-value="均码">均码</li>';
                break;
            case '2tong':
                html = '<li>21-30</li>' +
                    '<li>21-36</li>' +
                    '<li>21-37</li>' +
                    '<li>26-36</li>' +
                    '<li>27-37</li>' +
                    '<li>90-160</li>' +
                    '<li>110-160</li>' +
                    '<li>120-160</li>';
                break;
            default:
                $.each(sku_size,function (index,val){
                    html += '<li>'+ val +'</li>';
                })
        }
        return html;
    }

    // 生成具体的SKU配置表单
    SKU.prototype.renderTable = function (data) {
        let _this = this;

        // 渲染表头
        let thead_html = '<tr>';
        for(let key in data){
            if(key === '颜色'){
                let select = '颜色<select id="color-select" class="form-control" style="width: 100px">';
                select += '<option value ="">全部</option>';
                $.each(data[key],function (index,val){
                    select += '<option value="'+val.split('|')[0]+'">'+ val.split('|')[0] +'</option>';
                })
                select += '</select>';
                thead_html += '<th style="width: 120px" data-field="'+ key +'">' + select + '</th>'
            }else{
                thead_html += '<th style="width: 80px" data-field="'+ key +'">' + key + '</th>'
            }
        }

        thead_html += '<th data-field="pic" style="width: 70px">图片 </th>';
        thead_html += '<th data-field="stock" style="min-width: 100px">库存 <input type="text" class="form-control multi" placeholder="批量设置"></th>';
        thead_html += '<th data-field="wholesale_price">整拿价 <input type="text" class="form-control multi" placeholder="批量设置" style="margin-bottom: 10px"><div style="display: flex">' +
            '<div class="get-config-size-wrap"><input type="text" placeholder="双击获取尺码" class="form-control get-config-size" style="width: 100px"/><ul class="size-select-list"></ul></div>' +
            '<input type="text" placeholder="价格" class="form-control get-config-price" style="width: 100px">' +
            '<button type="button" class="btn btn-primary size-set" data-type="wholesale_price">设置</button></div>' +
            '</th>';
        thead_html += '<th data-field="price">散拿价 <input type="text" class="form-control multi" placeholder="批量设置" style="margin-bottom: 10px"><div style="display: flex">' +
            '<div class="get-config-size-wrap"><input type="text" placeholder="双击获取尺码" class="form-control get-config-size" style="width: 100px"/><ul class="size-select-list"></ul></div>' +
            '<input type="text" placeholder="价格" class="form-control get-config-price" style="width: 100px">' +
            '<button type="button" class="btn btn-primary size-set" data-type="price">设置</button></div>' +
            '</th>';

        thead_html += '</tr>';
        $('.sku_edit_warp thead').html(thead_html);

        // 求笛卡尔积
        let cartesianProductOf = (function () {
            return Array.prototype.reduce.call(arguments, function (a, b) {
                const ret = [];
                a.forEach(function (a) {
                    b.forEach(function (b) {
                        ret.push(a.concat([b]));
                    });
                });
                return ret;
            }, [[]]);
        })(...Object.values(data));

        // 根据计算的笛卡尔积渲染tbody
        let tbody_html = '';
        cartesianProductOf.forEach(function (data) {
            tbody_html += '<tr>';
            data.forEach(function (value,index) {
                // console.log(data);
                let attr_name = value.split('|')[0],
                    attr_val = value.split('|')[1];
                if(attr_val.split(':')[0] == 1){
                    tbody_html += '<td data-field="' + attr_val + '" class="attr-name color">' + attr_name + '</td>';
                }else if(attr_val.split(':')[0] == 2){
                    tbody_html += '<td data-field="' + attr_val + '" class="attr-name size">' + attr_name + '</td>';
                }else{
                    tbody_html += '<td data-field="' + attr_val + '" class="attr-name">' + attr_name + '</td>';
                }
            });
            tbody_html += '<td data-field="pic"><input value="" type="hidden" class="form-control"><span class="Js_sku_upload">' + uploadImageButton + '</span></td>';
            tbody_html += '<td data-field="stock"><input value="" type="text" class="form-control"></td>';
            tbody_html += '<td data-field="wholesale_price"><input value="" type="text" class="form-control wholesale_price"></td>';
            tbody_html += '<td data-field="price"><input value="" type="text" class="form-control price"></td>';

            tbody_html += '</tr>'
        });
        $('.sku_edit_warp tbody').html(tbody_html);

        //合并table相同列，参数table为表格id
        _this.uniteTdCells('table');
        _this.unitePic();

        //回填价格库存图片
        $.each(product_skus,function (index,val){
            let property = val.properties;
            let pic = val.pic;
            let price = val.price;
            let wholesale_price = val.wholesale_price;
            let stock = val.stock;
            $('.sku_edit_warp tbody tr').each(function (){
                let field = $(this).find('td').eq(0).attr('data-field') + ',' + $(this).find('td').eq(1).attr('data-field');
                if(field === property){
                    if(pic){
                        $(this).find('td[data-field="pic"]').find('input').val(pic);
                        $(this).find('td[data-field="pic"]').find('span').css('background-image',pic).html('');
                    }
                    $(this).find('td[data-field="price"]').find('input').val(price);
                    $(this).find('td[data-field="wholesale_price"]').find('input').val(wholesale_price);
                    $(this).find('td[data-field="stock"]').find('input').val(stock);
                }
            })
        })

        _this.processSku();
    };

    // 处理最终SKU数据，并写入input
    SKU.prototype.processSku = function () {
        let product_skus = [];
        let attr = [];
        let product_id = $.trim($('.field_id').text());
        $('.sku_edit_warp tbody tr').each(function () {
            let tr = $(this);
            let item_sku = {};
            item_sku['properties'] = '';
            item_sku['note'] = '';
            item_sku['product_id'] = product_id;
            tr.find('td[data-field]').each(function () {
                let td = $(this);
                let field = td.attr('data-field');
                let input = td.find('input');
                if (input.length) {
                    item_sku[field] = input.val();
                }else{
                    item_sku['properties'] += field + ',';
                }
                $('.sku_attr_key_val input[type="text"]').each(function (){
                    if($(this).val() && $(this).parents('.checkbox-wrp').find('input[type="checkbox"]').val() === field){
                        item_sku['note'] += field + '-' + $(this).val() + ';';
                    }
                });
            });
            item_sku['properties'] = item_sku['properties'].replace(/,$/gi,"");
            item_sku['note'] = item_sku['note'].replace(/;$/gi,"");
            item_sku['product_id'] = product_id;
            product_skus.push(item_sku);
        });

        $('.sku_warp input[type="checkbox"]').each(function (){
            if($(this).prop('checked')){
                let key = $(this).val().split(':')[0];
                let value = $(this).val().split(':')[1];
                attr.push({
                    'product_id':product_id,
                    'property_name_id':key,
                    'property_value_id':value
                })
            }
        });

        //判断必填属性
        $(function (){
            $('.sku_warp .row').each(function (){
                let that = $(this);
                let must = that.find('label').hasClass('asterisk');
                let label_text = that.find('label').text();
                let checked_arr = 0;
                let sub = $(this).parents('body').find('form:eq(0)').find('.submit');
                that.find('input[type="checkbox"]').each(function (){
                    if($(this).prop('checked')){
                        checked_arr++;
                    }
                })
                if(must && !checked_arr){
                    that.addClass("has_error");
                    that.find('.with-errors').text(label_text + '必选');
                    sub.attr("disabled","disabled");
                } else
                {
                    that.removeClass('has_error');
                    that.find('.with-errors').text('');
                }
                if(!that.parents('.sku_warp').find('.has_error').length)
                {
                    sub.removeAttr("disabled");
                }
            });
            $('.field_property').val(JSON.stringify(attr));
        })

        $('.Js_sku_input').val(JSON.stringify(product_skus));
    };

    //合并table相同列
    SKU.prototype.uniteTdCells = function (tableId){
        let table = document.getElementById(tableId);
        for (let i = 0; i < table.rows.length; i++) {
            for (let c = 0; c < table.rows[i].cells.length; c++) {
                for (let j = i + 1; j < table.rows.length; j++) {
                    let cell1 = table.rows[i].cells[c].innerHTML,
                        cell2 = table.rows[j].cells[c].innerHTML,
                        field = table.rows[j].cells[c].dataset.field,
                        userConfig = ['pic','stock','wholesale_price','price'];
                    if (cell1 == cell2 && userConfig.indexOf(field) === -1) {
                        table.rows[j].cells[c].style.display = 'none';
                        table.rows[j].cells[c].style.verticalAlign = 'middle';
                        table.rows[i].cells[c].rowSpan++;
                    }else{
                        table.rows[j].cells[c].style.verticalAlign = 'middle';
                        break;
                    }
                }
            }
        }
    };

    //合并图片相同列
    SKU.prototype.unitePic = function (){
        $('.sku_edit_warp tbody td').each(function () {
            let that = $(this),
                color_elem = that.parent().find('td').eq(0),
                field = that.attr('data-field'),
                color_rowspan= color_elem.attr('rowspan'),
                color_style = color_elem.attr('style');
            if(field === 'pic'){
                that.attr('rowspan',color_rowspan);
                that.attr('style',color_style);
            }
        })
    }

    // 图片上传
    SKU.prototype.upload = function (obj) {
        let _this = this;
        // 创建input[type="file"]元素
        let file_input = document.createElement('input');
        file_input.setAttribute('type', 'file');
        file_input.setAttribute('accept', 'image/x-png,image/jpeg');

        // 模拟点击 选择文件
        file_input.click();

        file_input.onchange = function () {
            let file = file_input.files[0];  //获取上传的文件名
            let formData = new FormData();
            formData.append('file', file);
            // 使用ajax上传文件
            $.ajax({
                type: "POST",
                url: UploadHost,
                data: formData,
                contentType: false, //告诉jQuery不要去设置Content-Type请求头
                headers: {
                    Accept: "application/json"
                },
                processData: false, //告诉jQuery不要去处理发送的数据
                success: function (res) {
                    obj.css('background-image', 'url(' + res.data.url + ')').html('');
                    obj.parent().find('input').val(res.data.url);
                    //为兄弟元素赋值图片
                    $('.sku_edit_warp tbody tr').each(function (){
                        let field = $(this).find('.color').attr('data-field');
                        let obj_field = obj.parents('tr').find('.color').attr('data-field');
                        if(field === obj_field){
                            $(this).find('td[data-field="pic"] input').val(res.data.url);
                        }
                    });
                    _this.processSku();
                }
            })
        }
    };

    SKU.prototype.createCheckBox = function (params) {
        if(!params.value || params.value.length <= 0)
        {
            return '';
        }
        var html='<div class="form-group row form-field">';
        if(params.is_must == 1){
            html+='<label class="text-capitalize asterisk control-label">'+params.title+'</label>';
        }else{
            html+='<label class="text-capitalize control-label">'+params.title+'</label>';
        }
        html+='<div class="col-md-12">';
        html+='<div class="help-block with-errors"></div>';
        html+='<div class="d-flex flex-wrap">';
        $.each(params.value,function (i,item){
            html+='<div class="checkbox-wrp">'
            html+='<div class="vs-checkbox-con vs-checkbox-primary" style="min-width:80px;padding: 5px 0">';
            html+='<input value="'+params.id+':'+item.id+'" data-text="'+ item.value +'" class="field_t _normal_ Dcat_Admin_Widgets_Checkbox" type="checkbox"><span class="vs-checkbox vs-checkbox-">';
            html+='<span class="vs-checkbox--check">';
            html+='<i class="vs-icon feather icon-check"></i>';
            html+='</span>';
            html+='</span>';
            html+='<span>'+item.value+'</span>';
            html+='</div>';
            if(params.is_sale == 1){
                html+='<input type="text" placeholder="备注" value="" class="form-control note" style="width: 80px">';
            }
            html+='</div>';
        });
        html+='</div>';
        html+='</div>';
        html+='</div>';
        return html;
    };
    window.FormSKU = SKU;
})();

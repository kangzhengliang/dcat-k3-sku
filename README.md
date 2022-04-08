# Dcat Admin 产品sku扩展

基于Dcat Admin SKU扩展增强版修改（https://github.com/Abbotton/dcat-sku-plus）

$form->sku('skus.sku', '属性')  
&emsp;&emsp; ->customFormat(function()use ($upload_img_url){  
&emsp;&emsp; &emsp;&emsp; return [  
&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; 'properties'       => $rs->data, //所有的属性  
&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; 'img_upload_url'   => $upload_img_url, //图片上传地址  
&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; 'product_property' => $this->properties, //产品已有属性  
&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; 'product_skus'     => $this->skus //产品sku数据  
&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; ];  
})
->saving(function ($value){
return json_decode($value,true);
})
->required();


properties数据包含所有的发布数据属性（即销售属性和非销售属性）  
格式[{  
&emsp;&emsp;category_id: "9999" 分类id  
&emsp;&emsp;en_name: "color" 属性英文名称  
&emsp;&emsp;form_type: "checkbox" html格式  
&emsp;&emsp;id: "1" 属性id  
&emsp;&emsp;is_multiple: "1" 是否多选  
&emsp;&emsp;is_must: "1" 是否必选  
&emsp;&emsp;is_sale: "1" 是否销售属性  
&emsp;&emsp;state: "1" 状态  
&emsp;&emsp;title: "颜色" 属性名称  
&emsp;&emsp;value: [{  
&emsp;&emsp;&emsp;&emsp;id: "1" 属性值id  
&emsp;&emsp;&emsp;&emsp;image: "" 图片  
&emsp;&emsp;&emsp;&emsp;property_name_id: "1" 属性id  
&emsp;&emsp;&emsp;&emsp;state: "1" 属性状态  
&emsp;&emsp;&emsp;&emsp;value: "黑色" 属性值  
&emsp;&emsp;}]  
}]

product_property 产品已选择的属性 
格式：属性id:属性值id,多个以;分隔


product_skus  产品sku
格式[{  
&emsp;&emsp;id: 73 sku的id  
&emsp;&emsp;note: "1:1-不是那么黑;2:7-偏小" 备注  
&emsp;&emsp;pic: "" 图片  
&emsp;&emsp;price: "35.00" 散拿价  
&emsp;&emsp;product_id: 1000001 产品id  
&emsp;&emsp;properties: "1:1,2:7" sku组合  
&emsp;&emsp;state: 1 状态  
&emsp;&emsp;stock: 9999 库存  
&emsp;&emsp;wholesale_price: "30.00"整拿价    
}]



非销售属性需要一个隐藏域  
$form->hidden('propertys.property')  
->saving(function ($value){  
&emsp;&emsp;return json_decode($value,true);  
})  
->setElementClass('property');





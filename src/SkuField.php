<?php
namespace Kangzhengliang\Dcat\Sku;
use Dcat\Admin\Admin;
use Dcat\Admin\Form\Field;
use Illuminate\Support\Arr;

class SkuField extends Field
{
    protected $view = 'kangzhengliang.dcat-k3-sku::sku_field';

    public function render()
    {
        $this->script = <<< EOF
                window.DemoSku = new FormSKU('{$this->getElementClassSelector()}')
EOF;
        return parent::render();
    }
}

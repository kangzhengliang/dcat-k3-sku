<?php

namespace Kangzhengliang\Dcat\Sku;

use Dcat\Admin\Extend\ServiceProvider;
use Dcat\Admin\Admin;
use Dcat\Admin\Form;

class DcatK3SkuServiceProvider extends ServiceProvider
{
	protected $js = [
        'js/sku.js'
    ];
	protected $css = [
        'css/sku.css'
	];

	public function register()
	{
		//
	}

	public function init()
	{
		parent::init();
        Admin::requireAssets('@kangzhengliang.dcat-k3-sku');
        if ($views = $this->getViewPath()) {
            $this->loadViewsFrom($views, 'sku');
        }

        Admin::booting(function () {
            Form::extend('sku', SkuField::class);
        });

	}

	public function settingForm()
	{
		return new Setting($this);
	}
}

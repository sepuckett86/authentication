<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class GminderRequest extends FormRequest
{
    public function rules()
    {
        return Config::get('boilerplate.gminder_request');
    }

    public function authorize()
    {
        return true;
    }
}

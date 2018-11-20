<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function rules()
    {
        return Config::get('boilerplate.user_request');
    }

    public function authorize()
    {
        return true;
    }
}

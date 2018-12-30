<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmailMailable;
use App\Http\Controllers\Controller;


class MailController extends Controller
{
    public function mail()
    {
        $name = 'Susan';
        Mail::to('sepuckett86@gmail.com')->send(new VerificationEmailMailable($name));
        
        return 'Email was sent.';
    }
}

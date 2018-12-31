<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Api\V1\Requests\AdminContactRequest;
use App\AdminContact;
use Illuminate\Support\Facades\Mail;
use App\Mail\AdminContacted;

class ContactAdminController extends Controller
{

    /*
    * Save firstName, lastName, email, and comment into admin_contacts table.
    * Send the information to email as well.
    */
    public function sendInfo(AdminContactRequest $request)
    {
        $adminContact = new AdminContact;

        // Info for email
        $sentInfo = [
            'firstName' => null,
            'lastName' => null,
            'email' => null,
            'comment' => null
        ];
        
        if ($request->get('firstName') !== null) {
            $adminContact->firstName = $request->get('firstName');
            $sentInfo['firstName'] = $request->get('firstName');
        }
        if ($request->get('lastName') !== null) {
            $adminContact->lastName = $request->get('lastName');
            $sentInfo['lastName'] = $request->get('lastName');
        }
        if ($request->get('email') !== null) {
            $adminContact->email = $request->get('email');
            $sentInfo['email'] = $request->get('email');
        }
        if ($request->get('comment') !== null) {
            $adminContact->comment = $request->get('comment');
            $sentInfo['comment'] = $request->get('comment');
        }
        
        if ($adminContact->save()) {
            Mail::to('goodminder.site@gmail.com')
                ->send(new AdminContacted($sentInfo));
                
            return 'Contact info saved and email sent.';
        } else {
            return 'Contact info save and email send failed.';
        }
    }
}

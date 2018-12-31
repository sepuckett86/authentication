<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Api\V1\Requests\AdminContactRequest;

class AdminContacted extends Mailable
{
    use Queueable, SerializesModels;

    public $sentInfo;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Array $sentInfo)
    {
        $this->sentInfo = $sentInfo;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('goodminder.site*@gmail.com', 'Goodminder Site')
            ->replyTo(
                $this->sentInfo['email'],
                $this->sentInfo['firstName'] . ' ' . $this->sentInfo['lastName']
            )
            ->subject('Contact Form Submitted')
            ->view('emails.contact');
    }
}

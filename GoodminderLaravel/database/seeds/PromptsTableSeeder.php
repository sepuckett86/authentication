<?php

use Illuminate\Database\Seeder;

class PromptsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $promptsToInsert = $this->getPromptsToInsert();

        foreach ($promptsToInsert as $promptCategory => $prompts){
            $promptCount = count($prompts);

            for ($i=0; $i<$promptCount; $i++){
                DB::table('prompts')->insert([
                    'user_id' => 1,
                    'collection' => $promptCategory,
                    'promptText' => $prompts[$i],
                    'publicFlag' => 1,
                    'created_at' => date('Y-m-d H:i:s')
                ]);
            }
        }

        $this->command->info('Prompts table seeded.');
    }

    private function getPromptsToInsert()
    {
        return [ 
            'General' => [
                    "If you could be any animal, what would you be?",
                    "Find something you highlighted on your eBook reader that you find hilarious/profound/great.",
                    "Write a funny joke. Or share one you like :) ",
                    "What's something interesting and new today?",
                    "How do you relax?"
            ],
            'Favorites' => [
                    "What is a song that made you smile in the past month?",
                    "What is something you cooked recently that was new and tasty?",
                    "Who is your favorite person? Why?",
                    "What is your favorite computer game and why?",
                    "What is a simple activity that you enjoy doing?",
                    "What is the cutest thing you saw today?",
                    "What is a movie that tends to improve your mood?",
                    "Who is someone you are glad exists?",
                    "What is a really interesting question somebody asked you?"
            ],
            'Happenings' => [
                "What was an experience that you will treasure forever?",
                "Share a time when you were proud of yourself",
                "What unique experience did you have today that was unexpected but interesting in a good way?",
                "What is a struggle that you overcame this week and feel proud about?",
                "Describe the details of a scene from your life that you value. What were the sights, sounds, smells, emotions, people present?",
                "Write down an instance where you were nervous but then it turned out better than expected.",
                "Think of a pleasant time when you ate food with someone else. What did you and and who was it? Describe the interaction. ",
                "Describe a time you felt inspired and motivated to do something. What was it? ",
                "Did you laugh recently? Why?",
                "What is something you learned about someone recently that was a pleasant surprise?",
                "Describe your last positive experience with nature. ",
                "Describe a moment when imperfection was a virtue. ",
                "Describe a moment when you were pleasantly surprised. ",
                "Describe a moment when somebody you value was proud of you. ",
                "Describe a moment of pure satisfaction.",
                "When was the last time you unexpectedly ran into someone and you had a nice chat?",
                "What was something positive someone said to you recently by email, writing, phone, or in person?",
                "When was the last time someone was surprised at how good you were at something?",
                "What is an example of a photo that turned out better than expected?",
                "When was the last time you felt really comfortable? Describe it. ",
                "Describe a near-death experience you are relieved to have survived. Did it change your outlook on life? ",
                "When was the last time you worked really hard and it paid off? What was that like?",
                "When was the last time someone 'kept it real' for the better?",
                "Describe a time you were in the flow/in the zone. Focused, dedicated to something you excel at, and lost track of time. What kept you going?",
                "When's the last time you couldn't stop laughing? Why were you laughing?",
                "Describe a time in which you were cozy with friends and were being your true, relaxed self.",
            ],
            'Personal' => [
                "How have you changed for the better (in your opinion) in the past year?",
                "Have you made a new friendship recently? Who is it and what do you like about that person?",
                "What is a quality that you admire in someone else? What are examples of this quality?",
                "What is something that makes you feel wonder? Hope? Motivation? Love?",
                "Open up your phone photos and find one that makes you smile. What is it?",
                "What is something worthwhile you learned in the past week?",
                "What are you thankful for?",
                "Write down three good things in your life right now. They can be minor or major.",
                "What is something that helps you relieve anxiety? ",
                "Describe something that can be a negative but is also somewhat funny or amusing.",
                "Write a description of a place in which you spend a large amount of your time. What is one way you have positively impacted that space?",
                "How do you feel when you are doing something you are passionate about? Describe it.",
                "Describe something you created that you are proud of. ",
                "What is something you have changed your mind in and felt more enlightened because of it? ",
                "Describe a time when you were right and somebody else was wrong. ",
                "When's a time you suffered but made it through the suffering?",
                "Find the most meaningful object in the room. Describe it."
            ]
        ];

    }
}

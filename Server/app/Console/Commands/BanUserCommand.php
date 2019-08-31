<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Domain\Users\{User, Actions\BanUser};

class BanUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ban:user {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will ban user using email address';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @param User $user
     * @param BanUser $banUser
     * @return mixed
     */
    public function handle(User $user, BanUser $banUser)
    {
        if (! $user = $user->findByEmail($this->argument('email'))) {
            $this->error("User not found");
            return;
        }

        if ($banUser->execute($user)) {
            $this->info("User with email:{$this->argument('email')} banned successfully");
            return;
        }

        $this->error("Unable to ban user");
    }
}

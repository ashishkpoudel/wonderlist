<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Domain\Users\{User, Actions\UnbanUser};

class UnbanUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'unban:user {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will unban user using email address';

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
     * @param UnbanUser $unbanUser
     * @return mixed
     */
    public function handle(User $user, UnbanUser $unbanUser)
    {
        if (! $user = $user->findByEmail($this->argument('email'))) {
            $this->error("User not found");
            return;
        }

        if ($unbanUser->execute($user)) {
            $this->info("User with email:{$this->argument('email')} un-banned successfully");
            return;
        }

        $this->error("Unable to un-ban user");
    }
}

import random
from pyfiglet import Figlet


def main():
    x = Figlet(font="rectangles")
    print("=" * 60)
    print(x.renderText("NBA PLAYER GUESSING GAME"))
    print("=" * 60)


    while True:
        id, playerName = generatePlayer()
        print("\n" + "-" * 60)
        print("Generating a player... Get ready to guess!")
        print("-" * 60)
       
        playerStats = generateStats(id)


        print("\n" + "-" * 60)
        print("Player Career Stats:")
        print("-" * 60)
        print(playerStats[['SEASON', 'TEAM', 'PTS', 'AST', 'REB', 'STL', 'BLK', 'TOV', 'FG_PCT','3PT_PCT', 'MIN']].to_string(index=False))
        print("-" * 60)


        guessCheck(playerStats, playerName)


        print("\n" + "=" * 60)
        playAgain = input("Play Again? (y/n): ").lower().strip()
        print("=" * 60)
        if playAgain != "y":
            print("Thanks for playing!")
            break


def generatePlayer():
    from nba_api.stats.static import players
    from unidecode import unidecode


    playerList = players.get_active_players()
    gamePlayer = random.choice(playerList)
    return (gamePlayer["id"], unidecode(gamePlayer["full_name"]))


def generateStats(playerID):
    from nba_api.stats.endpoints import playercareerstats


    career = playercareerstats.PlayerCareerStats(player_id=playerID)
    playerStats = career.get_data_frames()[0]
    playerStats.rename(columns={'TEAM_ABBREVIATION': 'TEAM', 'SEASON_ID': 'SEASON', 'FG3_PCT': '3PT_PCT'}, inplace=True)


    playerStats['PTS'] = (playerStats['PTS'] / playerStats['GP']).round(1)
    playerStats['AST'] = (playerStats['AST'] / playerStats['GP']).round(1)
    playerStats['REB'] = (playerStats['REB'] / playerStats['GP']).round(1)
    playerStats['STL'] = (playerStats['STL'] / playerStats['GP']).round(1)
    playerStats['BLK'] = (playerStats['BLK'] / playerStats['GP']).round(1)
    playerStats['TOV'] = (playerStats['TOV'] / playerStats['GP']).round(1)
    playerStats['MIN'] = (playerStats['MIN'] / playerStats['GP']).round(1)


    return playerStats.drop(['PLAYER_ID', 'LEAGUE_ID', 'TEAM_ID', 'GS', 'FGM', 'FGA', 'FTM', 'FTA', 'OREB', "DREB", "FG3M", "FG3A"], axis=1)


def guessCheck(stats, answer):
    guesses = 1
    maxGuesses = 8
    while guesses <= maxGuesses:
        guess = input(f"\nGuess A Player (#{guesses}): ").lower().strip()
        if guess == answer.lower().strip():
            print("\n" + "=" * 60)
            print(f"🎉 YOU WIN! You guessed it in {guesses} guesses.")
            print("=" * 60)
            break
        else:
            if guesses == maxGuesses:
                print("\n" + "=" * 60)
                print(f"❌ GAME OVER! The correct answer was {answer}")
                print("=" * 60)
                break
            elif guesses == 4:
                hintConfirm = input("Incorrect! Would you like a hint? (y/n): ").lower().strip()
                if hintConfirm == "y":
                    hint(answer)
            print("INCORRECT! Guess Again!")
            guesses += 1


def hint(playerName):
    name = playerName.strip()
    print("\n" + "-" * 60)
    print("HINT:", end=" ")
    for i in name:
        if i.islower():
            print("_", end=" ")
        else:
            print(i, end=" ")
    print("\n" + "-" * 60)


main()






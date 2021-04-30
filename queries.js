
var matchesQuery = `{
  match(id: "1") {
    id
    date
    result
    teams {
      id
      name
      isWon
      matchId
      extras
      total
      overs
      teamRating
      count
      playing {
        player {
          id
          name
        }
      }
      batting {
        id
        runs
        balls
        fours
        sixes
        sr
        status
        player {
          name
        }
      }
      bowling {
        id
        overs
        runs
        wickets
        maindains
        economy
        player {
          name
        }
      }
      rating {
        id
        rating
        player {
          name
        }
      }
      tournament {
        name
        host
        year
      }
    }
  }
}
  `;

var players = `{
  players {
    id
    name
    photo
  }
}
`;

var addPlayer = `mutation {
  addPlayer(name: "Virat Kohli", photo: "https://www.cricbuzz.com/a/img/v1/75x75/i1/c170661/virat-kohli.jpg") {
    id
    name
    photo
  }
}`;

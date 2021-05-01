
var matchesQuery = `{
  match(id: "608cdb77aed2060eb4baf1bd"){
    id
    name
    date
    result
    tournament {
      id
      year
      name
      host
    }
    teams {
      id
      name
      matchId
      isWon
      playingIds
      playing {
      	id
        name
        photo
      }
      teamRating
      count
      extras
      total
      overs
      batting {
        id
        teamId
        playerId
        player {
          id
          name
          photo
        }
        runs
        balls
        fours
        sixes
        sr
        status
      }
      bowling {
        id
        teamId
        playerId
        player {
          id
          name
          photo
        }
        overs
        runs
        maindains
        wickets
        economy
      }
      rating {
        id
        teamId
        playerId
        player {
          id
          name
          photo
        }
        rating
        defaultRating
      }
      performance {
        id
        teamId
        playerId
        player {
          id
          name
          photo
        }
        performance
      }
    }
  }
}`;

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

var addMatch = `mutation {
  uploadMatch(input: {
    match: {
      name: "Match 22", 
      tournamentId:"1", 
      date:"May 1, 2021", 
      result:"CSK Won By 5 Runs",
      teams: [
        {
          name: "CSK",
          isWon: true,
          playingIds: [
            "608bda859d355e079470855a",
            "608cd912fddeb831a4c7a2a7",
          ],
          teamRating: 1,
          count: 1,
          extras: 8,
          total: 171,
          overs: 20,
          batting: [
            {
              playerId: "608bda859d355e079470855a",
              runs: 12,
              balls: 32,
              fours: 1,
              sixes: 0,
              sr: 50.43,
              status: "not out",
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              runs: 120,
              balls: 32,
              fours: 1,
              sixes: 0,
              sr: 50.43,
              status: "not out",
            }
          ],
          bowling: [
            {
              playerId: "608bda859d355e079470855a",
              overs: 4,
              runs: 12,
              maindains: 2,
              wickets: 4,
              economy:1.43
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              overs: 4,
              runs: 12,
              maindains: 2,
              wickets: 6,
              economy:1.43
            }
          ],
          rating: [
            {
              playerId: "608bda859d355e079470855a",
              defaultRating: 4,
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              defaultRating: 4,
            }
          ],
          performance: [
            {
              playerId: "608bda859d355e079470855a",
              performance: [
                "Did not run faster",
                "No catches",
              ],
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              performance: [
                "Scored a centure",
                "Effected a big runout",
              ],
            }
          ]
        },
        {
          name: "RR",
          isWon: true,
          playingIds: [
            "608bda859d355e079470855a",
            "608cd912fddeb831a4c7a2a7",
          ],
          teamRating: 1,
          count: 1,
          extras: 8,
          total: 171,
          overs: 20,
          batting: [
            {
              playerId: "608bda859d355e079470855a",
              runs: 12,
              balls: 32,
              fours: 1,
              sixes: 0,
              sr: 50.43,
              status: "not out",
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              runs: 120,
              balls: 32,
              fours: 1,
              sixes: 0,
              sr: 50.43,
              status: "not out",
            }
          ],
          bowling: [
            {
              playerId: "608bda859d355e079470855a",
              overs: 4,
              runs: 12,
              maindains: 2,
              wickets: 4,
              economy:1.43
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              overs: 4,
              runs: 12,
              maindains: 2,
              wickets: 6,
              economy:1.43
            }
          ],
          rating: [
            {
              playerId: "608bda859d355e079470855a",
              defaultRating: 4,
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              defaultRating: 4,
            }
          ],
          performance: [
            {
              playerId: "608bda859d355e079470855a",
              performance: [
                "Did not run faster",
                "No catches",
              ],
            },
            {
              playerId: "608cd912fddeb831a4c7a2a7",
              performance: [
                "Scored a centure",
                "Effected a big runout",
              ],
            }
          ]
        }
      ]
  	}
  }){
    id,
    name
  }
}`;

var updateRating = `mutation {
  updateRating(input: {
    id: "608cdb77aed2060eb4baf1bd",
    teams: [
      {
      	id: "608cdb77aed2060eb4baf1bf",
        teamRating: 5.994,
        count: 2,
        rating: [
          {
            playerId: "608bda859d355e079470855a",
            rating: 3.21
          }
        ]
      }
    ]
  })
  {}
}`
"use client"

import { useEffect, useState } from "react"
import { RotateCw } from "lucide-react"

type SongQuote = {
  quote: string
  song: string
  artists: string
}

// Placeholder quotes - edit this list freely.
const SONG_QUOTES: SongQuote[] = [
  {
    quote: "Look me in the eyes, tell me what you see. Perfect paradise, tearing at the seams?",
    song: "Bad Liar",
    artists: "Imagine Dragons",
  },
  {
    quote: "My love, my life, my drive, it came from PAIN!",
    song: "Believer",
    artists: "Imagine Dragons",
  },
  {
    quote:
      "I see who you are, you are my enemy. My enemy, you are my enemy.",
    song: "Enemy",
    artists: "Tommee Profitt, Beacon Light, Sam Tinnesz",
  },
  {
    quote: "Like what's up danger? Like what's up danger? Don't be a stranger! What's up danger?",
    song: "What's Up Danger",
    artists: "Blackway, Black Caviar",
  },
  {
    quote: "Wish we could turn back time to the good old days.",
    song: "Stressed Out",
    artists: "Twenty One Pilots",
  },
  {
    quote: "Sometimes family and friends, that's the same thing.",
    song: "My City",
    artists: "24kGoldn, Kane Brown, G Herbo",
  },
  {
    quote: "I never feared death or dyin'. I only fear never tryin'. I am whatever I am. Only God can judge me now.",
    song: "We Own It",
    artists: "2 Chainz, Wiz Khalifa",
  },
  {
    quote: "If I can't do it, homie. It can't be done.",
    song: "If I Can't",
    artists: "50 Cent",
  },
  {
    quote: "I'm on the highway to Hell.",
    song: "Highway to Hell",
    artists: "AC/DC",
  },
  {
    quote: "Sing with me, sing for a year. Sing for the laughter, sing for the tear. Sing with me, if it's just for today. Maybe tomorrow, the good Lord will take you away. Dream on.",
    song: "Dream On",
    artists: "Aerosmith",
  },
  {
    quote: "Won't you help me sober up?",
    song: "Sober Up",
    artists: "AJR",
  },
  {
    quote: "Are you gonna drop the bomb or not? Let us die young or let us live forever. We don't have the power but we never say never.",
    song: "Forever Young",
    artists: "Alphaville",
  },
  {
    quote: "He said, \"One day you'll leave this world behind, so live a life you will remember.\" My father told me when I was just a child, \"These are the nights that never die\"",
    song: "The Nights",
    artists: "Avicii",
  },
  {
    quote: "They say I'm caught up in a dream. Well, life will pass me by if I don't open up my eyes. Well, that's fine by me.",
    song: "Wake Me Up",
    artists: "Avicii",
  },
  {
    quote: "Can we pretend that airplanes in the night sky are like shootin' stars? I could really use a wish right now, wish right now, wish right now. Yeah, I could use a dream or a genie or a wish.",
    song: "Airplanes",
    artists: "B.o.B, Hayley Williams",
  },
  {
    quote: "Whoa, we're halfway there. Whoa oh, livin' on a prayer.",
    song: "Livin' On A Prayer",
    artists: "Bon Jovi",
  },
  {
    quote: "Crashin, hit a wall. Right now, I need a miracle.",
    song: "Don't Let Me Down",
    artists: "The Chainsmokers, Daya",
  },
  {
    quote: "I've been reading books of old. The legends and the myths: Achilles and his gold, Hercules and his gifts, Spider-Man's control, and Batman with his fists. And clearly I don't see myself upon that list.",
    song: "Something Just Like This",
    artists: "The Chainsmokers, Coldplay",
  },
  {
    quote: "If we go down, then we go down together. They'll say you could do anything. They'll say that I was clever.",
    song: "Paris",
    artists: "The Chainsmokers",
  },
  {
    quote: "I'd let the world burn, let the world burn for you.",
    song: "Let the World Burn",
    artists: "Chris Grey",
  },
  {
    quote: "Should I stay, or should I go now? If I go, there will be trouble. And if I stay, it will be double.",
    song: "Should I Stay Or Should I Go",
    artists: "The Clash",
  },
  {
    quote: "Got me feeling drunk and high.",
    song: "Hymn For The Weekend",
    artists: "Coldplay",
  },
  {
    quote: "Nobody said it was easy. No one ever said it would be so hard.",
    song: "The Scientist",
    artists: "Coldplay",
  },
  {
    quote: "Am I a part of the cure? Or am I part of the disease?",
    song: "Clocks",
    artists: "Coldplay",
  },
  {
    quote: "Hidin' all our sins from the daylight. From the daylight, runnin' from the daylight. From the daylight, runnin' from the daylight. Oh, I love it and I hate it at the same time.",
    song: "Daylight",
    artists: "David Kushner",
  },
  {
    quote: "Every step I take, every move I make, every single day, every time I pray, I'll be missing you.",
    song: "I'll Be Missing You",
    artists: "Diddy, Faith Evans",
  },
  {
    quote: "Tell me, why are we so blind to see, that the ones we hurt are you and me?",
    song: "Living In A Gangsta's Paradise",
    artists: "Coolio, L.V.",
  },
  {
    quote: "Tryna keep it peaceful is a struggle for me.",
    song: "God's Plan",
    artists: "Drake",
  },
  {
    quote: "Welcome to the Hotel California! Such a lovely place, such a lovely face.",
    song: "Hotel California",
    artists: "Eagles",
  },
  {
    quote: "And if you're talking money, then my conversation's shiftin. My dreams are bigger than just bein' on the rich list. Might be insanity, but people call it \"Gifted.\" My face is going numb from the sh*t this stuff is mixed with.",
    song: "Remember the Name",
    artists: "Ed Sheeran, 50 Cent, Eminem",
  },
  {
    quote: "The thought that I would stop when I'm dead just popped in my head. I said it, then forget what I said.",
    song: "Remember the Name",
    artists: "Ed Sheeran, 50 Cent, Eminem",
  },
  {
    quote: "My bad habits lead to late nights endin' alone, conversations with a stranger I barely know. Swearin' this will be the last, but it probably won't. I got nothing left to lose, or use, or do.",
    song: "Bad Habits",
    artists: "Ed Sheeran",
  },
  {
    quote: "Do you ever get a little bit tired of life? Like you're not really happy but you don't wanna die?",
    song: "Numb Little Bug",
    artists: "Em Beihold",
  },
  //   {
  //     quote: "Go to sleep, b*tch, why are you still alive? How many times I gotta say, \"Close your eyes\"? And go to sleep, b*tch, die, m*th*rf*ck*r, die. Bye, bye, m*th*rf*ck*r, bye, bye.",
  //     song: "Go To Sleep",
  //     artists: "Eminem, Obie Trice, DMX",
  //   },
  {
    quote: "You better lose yourself in the music. The moment, you own it, you better never let it go. You only get one shot, do not miss your chance to blow. This opportunity comes once in a lifetime, yo.",
    song: "Lose Yourself",
    artists: "Eminem",
  },
  {
    quote: "No more games, I'mma change what you call rage, tear this m*th*rf*ck*ng roof off like two dogs caged. I was playin' in the beginning, the mood all changed. I've been chewed up, and spit out, and booed off stage, but I kept rhymin' and stepped right in the next cypher.",
    song: "Lose Yourself",
    artists: "Eminem",
  },
  {
    quote: "This world is mine for the taking. Make me king.",
    song: "Lose Yourself",
    artists: "Eminem",
  },
  {
    quote: "Now, this looks like a job for me. So, everybody, just follow me, cause we need a little controversy, cause it feels so empty without me.",
    song: "Without Me",
    artists: "Eminem",
  },
  {
    quote: "Till I collapse, I'm spillin' these raps long as you feel 'em. Till the day that I drop, you'll never say that I'm not killin' em.",
    song: "Till I Collapse",
    artists: "Eminem, Nate Dogg",
  },
  {
    quote: "I'm Slim Shady, yes, I'm the real Shady. All you other Slim Shadys are just imitating.",
    song: "The Real Slim Shady",
    artists: "Eminem",
  },
  {
    quote: "Don't be a r*t*rd, be a king? Think not, why be a king when you can be a god?",
    song: "Rap God",
    artists: "Eminem",
  },
  {
    quote: "I'm friends with the monster that's under my bed. Get along with the voices inside of my head. You're tryin' to save me, stop holding your breath, and you think I'm crazy, you, you think I'm crazy.",
    song: "The Monster",
    artists: "Eminem, Rihanna",
  },
  {
    quote: "You get in my way, I'mma feed you to the monster. I'm normal during the day, but at night, turn to a monster.",
    song: "Godzilla",
    artists: "Eminem",
  },
  {
    quote: "I'm not afraid to take a stand.",
    song: "Not Afraid",
    artists: "Eminem",
  },
  {
    quote: "I've been a liar, been a thief. Been a lover, been a cheat. All my sins need holy water, feel it washin' over me.",
    song: "River",
    artists: "Eminem, Ed Sheeran",
  },
  {
    quote: "Venom adrenaline momentum, and I'm not knowin' when I'm ever gonna slow up and I'm ready to snap any moment, I'm thinkin' it's time to go get 'em. They ain't gonna know what hit 'em.",
    song: "Venom",
    artists: "Eminem",
  },
  {
    quote: "Sweet dreams are made of this, who am I to disagree? I travel the world and the seven seas. Everybody's looking for something.",
    song: "Sweet Dreams",
    artists: "Eurythmics",
  },
  {
    quote: "Wake me up inside. Call my name and save me from the dark. Bid my blood to run, before I come undone. Save me from the nothin' I've become.",
    song: "Bring me to life",
    artists: "Evanescence",
  },
  {
    quote: "Some legends are told, some turn to dust or to gold, but you will remember me. Remember me for centuries.",
    song: "Centuries",
    artists: "Fall Out Boy",
  },
  {
    quote: "They say we are what we are, but we don't have to be.",
    song: "Immortals",
    artists: "Fall Out Boy",
  },
  {
    quote: "This is 10% luck, 20% skill, 15% concentrated power of will, 5% pleasure, 50% pain, and 100% reason to remember the name.",
    song: "Remember The Name",
    artists: "Fort Minor, Styles of Beyond",
  },
  {
    quote: "Tonight, we are young, so let's set the world on fire. We can burn brighter than the sun.",
    song: "We are Young",
    artists: "Fun, Janelle Monáe",
  },
  {
    quote: "And I don't want the world to see me, cause I don't think that they'd understand. When everything's made to be broken, I just want you to know who I am.",
    song: "Iris",
    artists: "Goo Goo Dolls",
  },
  {
    quote: "Sometimes I give myself the creeps, sometimes my mind plays tricks on me.",
    song: "Basket Case",
    artists: "Green Day",
  },
  {
    quote: "I walk a lonely road. The only one that I have ever known. Don't know where it goes, but it's home to me and I walk alone.",
    song: "Boulevard of Broken Dreams",
    artists: "Green Day",
  },
  {
    quote: "Take me to church. I'll worship like a dog at the shrine of your lies. I'll tell you my sins and you can sharpen your knife. Offer me that deathless death.",
    song: "Take Me To Church",
    artists: "Hozier",
  },
  {
    quote: "If it's crazy, live a little crazy. You can play it sensible, a king of conventional, or you can risk it all and see.",
    song: "The Other Side",
    artists: "Hugh Jackman, Zac Efron",
  },
  {
    quote: "Cause I love the adrenaline in my veins, I do whatever it takes.",
    song: "Whatever It Takes",
    artists: "Imagine Dragons",
  },
  {
    quote: "Just a young gun with a quick fuse, I was uptight, wanna let loose. I was dreaming of bigger things and wanna leave my own life behind. Not a \"Yes, sir,\" not a follower.",
    song: "Thunder",
    artists: "Imagine Dragons",
  },
  {
    quote: "Oh, the misery, everybody wants to be my enemy. Spare the sympathy, everybody wants to be my enemy.",
    song: "Enemy",
    artists: "Imagine Dragons, JID",
  },
  {
    quote: "I will follow you down wherever you may go. I'll follow you way down to your deepest low. I'll always be around wherever life takes you. You know I'll follow you.",
    song: "Follow You",
    artists: "Imagine Dragons",
  },
  {
    quote: "Our patience is waning, is this entertaining? I got this feeling, yeah, you know, where I'm losing all control, cause there's magic in my bones.",
    song: "Bones",
    artists: "Imagine Dragons",
  },
  {
    quote: "You think you're better than them, you think they're really your friends, but when it comes to the end, you're just the same as them.",
    song: "Sharks",
    artists: "Imagine Dragons",
  },
  {
    quote: "I'm waking up, I feel it in my bones, enough to make my system blow. Welcome to the new age, to the new age.",
    song: "Radioactive",
    artists: "Imagine Dragons",
  },
  {
    quote: "So this is where you fell, and I am left to sell. The path to heaven runs through miles of clouded hell.",
    song: "It's Time",
    artists: "Imagine Dragons",
  },
  {
    quote: "I wanna hide the truth, I wanna shelter you, but with the beast inside, there's nowhere we can hide. No matter what we breed, we are still made of greed. This is my kingdom come, this is my kingdom come.",
    song: "Demons",
    artists: "Imagine Dragons",
  },
  {
    quote: "I'm on top of the world.",
    song: "On Top Of The World",
    artists: "Imagine Dragons",
  },
  {
    quote: "That's the price you pay, leave behind your heart and cast away. Just another product of today, rather be the hunter than the prey, and you're standing on the edge, face up, cause you're a natural! A beating heart of stone, you gotta be so cold, to make it in this world.",
    song: "Natural",
    artists: "Imagine Dragons",
  },
  {
    quote: "In youth, you'd lay awake at night and scheme, of all the things that you would change, but it was just a dream.",
    song: "Warriors",
    artists: "Imagine Dragons",
  },
  {
    quote: "Are you, are you, coming to the tree? They strung up a man, they say who murdered three. Strange things did happen here, no stranger would it be, if we met at midnight in the hanging tree.",
    song: "The Hanging Tree",
    artists: "Suzanne Collins, James Newton Howard, Wesley Schultz, Jeremiah Fraites",
  },
  {
    quote: "Life's a game, but it's not fair. I break the rules so I don't care, so I keep doin' my own thing.",
    song: "Run This Town",
    artists: "JAŸ-Z, Rihanna, Kanye West",
  },
  {
    quote: "Can I get an encore? Do you want more? I've become so numb, so for one last time I need y'all to roar. One last time I need y'all to roar.",
    song: "Numb / Encore",
    artists: "JAŸ-Z, Linkin Park",
  },
  {
    quote: "Imagine all the people, livin' life in peace.",
    song: "Imagine",
    artists: "John Lennon",
  },
  {
    quote: "Don't stop believin', hold on to that feelin'.",
    song: "Don't Stop Believin'",
    artists: "Journey",
  },
  {
    quote: "When I get older, I will be stronger. They'll call me freedom, just like a wavin' flag.",
    song: "Wavin' Flag",
    artists: "K'naan",
  },
  {
    quote: "We get what we deserve.",
    song: "Way Down We Go",
    artists: "KALEO",
  },
  {
    quote: "Don't ever say it's over if I'm breathin'. Racin' to the moonlight and I'm speedin'. I'm headed to the stars, ready to go far. I'm star walkin'",
    song: "Star Walkin'",
    artists: "Lil Nas X",
  },
  {
    quote: "I'm not scared of the dark. I'm not running, running, running. No, I'm not afraid of the fall. Why would a star, a star ever be afraid of the dark?",
    song: "Scared Of The Dark",
    artists: "Lil Wayne, Ty Dolla $ign, XXXTentacion",
  },
  {
    quote: "I ain't never scared and I ain't never horrified. I just look down at my Rolex, it said it's the darkest times. I ain't never terrified, I ain't never petrified. You know I see dead people, I just tell them, \"Get a life.\"",
    song: "Scared Of The Dark",
    artists: "Lil Wayne, Ty Dolla $ign, XXXTentacion",
  },
  {
    quote: "Feelin' the world go against us, so we put the world on our shoulders.",
    song: "Sucker For Pain",
    artists: "Lil Wayne, Wiz Khalifa, Imagine Dragons, Logic, Ty Dolla $ign",
  },
  {
    quote: "I tried so hard and got so far, but in the end, it doesn't even matter. I had to fall to lose it all.",
    song: "In The End",
    artists: "Linkin Park",
  },
  {
    quote: "I heard you die twice, once when they bury you in the grave and the second time is the last time that somebody mentions your name.",
    song: "Glorious",
    artists: "Macklemore, Skylar Grey",
  },
  {
    quote: "Tonight is the night, we'll fight till it's over, so we put our hands up like the ceiling can't hold us.",
    song: "Can't Hold Us",
    artists: "Macklemore, Ryan Lewis",
  },
  {
    quote: "She said, \"You think the devil has horns? Well, so did I, but I was wrong. His hair is combed and wears a suit and tie. He's nice, polite, he'll catch you by surprise. A smile so bright, you'd never bat an eye.\"",
    song: "Devil In Disguise",
    artists: "Marino",
  },
  {
    quote: "Here's to the ones that we got. Cheers to the wish you were here, but you're not, 'cause the drinks bring back all the memories of everything we've been through.",
    song: "Memories",
    artists: "Maroon 5",
  },
  {
    quote: "I feel like an astronaut in the ocean.",
    song: "Astronaut In The Ocean",
    artists: "Masked Wolf",
  },
  {
    quote: "Now tell me, how did all my dreams turn to nightmares? How did I lose it when I was right there? Now I'm so far that it feels like it's all gone to pieces. Tell me why the world never fights fair?",
    song: "Home",
    artists: "mgk, X Ambassadors, Bebe Rexha",
  },
  {
    quote: "Voices in the air. I hear 'em loud and clear telling me to listen. Whispers in my ear. Nothing can compare, I just wanna listen. Telling me, I'm invincible.",
    song: "Invincible",
    artists: "mgk, Ester Dean",
  },
  {
    quote: "Is this what you wanted?",
    song: "FEAR",
    artists: "NF",
  },
  {
    quote: "What's my definition of success? Listening to what your heart says. Standing up for what you know is right, while everybody else is tucking their tail between their legs. What's my definition of success? Crafting something no one else can. Being brave enough to dream big.",
    song: "HOPE",
    artists: "NF",
  },
  {
    quote: "You can call me what you wanna, but you can never call me forgettable.",
    song: "The Search",
    artists: "NF",
  },
  {
    quote: "With a thousand lies and a good disguise, hit 'em right between the eyes.",
    song: "You're Gonna Go Far, Kid",
    artists: "The Offspring",
  },
  {
    quote: "I've got fire for a heart. I'm not scared of the dark. You've never seen it look so easy.",
    song: "Drag Me Down",
    artists: "One Direction",
  },
  {
    quote: "Mental wounds not healing, life's a bitter shame. I'm going off the rails on a crazy train.",
    song: "Crazy Train",
    artists: "Ozzy Osbourne",
  },
  {
    quote: "I close my eyes and wait to hear the sound of someone screaming here. No more tears.",
    song: "No More Tears",
    artists: "Ozzy Osbourne",
  },
  {
    quote: "Had to have high, high hopes for a living. Didn't know how, but I always had a feeling. I was gonna be that one in a million.",
    song: "High Hopes",
    artists: "Panic! At The Disco",
  },
  {
    quote: "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality.",
    song: "Bohemian Rhapsody",
    artists: "Queen",
  },
  {
    quote: "That's me in the corner, that's me in the spotlight, losing my religion.",
    song: "Losing My Religion",
    artists: "R.E.M.",
  },
  {
    quote: "Maybe I'm foolish, maybe I'm blind. Thinkin' I can see through this and see what's behind, got no way to prove it, so maybe I'm lyin'. But I'm only human after all, I'm only human after all. Don't put your blame on me.",
    song: "Human",
    artists: "Rag'n'Bone Man",
  },
  {
    quote: "Dream of Californication",
    song: "Californication",
    artists: "Red Hot Chili Peppers",
  },
  {
    quote: "California, rest in peace.",
    song: "Dani California",
    artists: "Red Hot Chili Peppers",
  },
  {
    quote: "Said I'll always be your friend. Took an oath, I'mma stick it out to the end.",
    song: "Umbrella",
    artists: "Rihanna, JAŸ-Z",
  },
  {
    quote: "There is no time to waste. I've got that lightnin' inside me. This is how legends are made.",
    song: "Legends Are Made",
    artists: "Sam Tinnesz",
  },
  {
    quote: "Won't stop till we're legend. Blood, sweat, I'll break my bones till all my scars bleed golden. My name's forever known.",
    song: "Legends",
    artists: "The Score",
  },
  {
    quote: "We can be heroes everywhere we go. We can have all that we ever want. Swinging like Ali, knocking out bodies, standing on top like a champion. Keep your silver, give me that gold. You will remember when I say, we can be heroes everywhere we go. Keeping us down is impossible, cause we're unstoppable.",
    song: "Unstoppable",
    artists: "The Score",
  },
  {
    quote: "This is not another story. This is not another drill. I refuse to be another number now, never staying down. This is something real. I'm a name that you'll remember. I am more than just a thrill. I am gonna be the greatest ever now, watch out, I'm a force that you will feel.",
    song: "Glory",
    artists: "The Score",
  },
  {
    quote: "Yeah, you can be the greatest, you can be the best. You can be the King Kong bangin' on your chest. You can beat the world, you can win the war. You can talk to God, go banging on his door.",
    song: "Hall of Fame",
    artists: "The Script, Will.I.Am",
  },
  {
    quote: "Something's got a hold of me lately. No, I don't know myself anymore. Feels like the walls are all closin' in, and the devil's knockin' at my door.",
    song: "Lose Control",
    artists: "Teddy Swims",
  },
  {
    quote: "Don't you be afraid, everything will change. You and I jumping off the edge. They say dreamers never die, so come and fly, come and fly. Come and fly away with me.",
    song: "Fly Away",
    artists: "TheFatRat, Anjulie",
  },
  {
    quote: "When you feel it's hopeless, when you think that you lost, I will take your hand and we'll rise up from the dust.",
    song: "Rise Up",
    artists: "TheFatRat",
  },
  {
    quote: "I've been thinkin' too much, help me.",
    song: "Ride",
    artists: "Twenty One Pilots",
  },
  {
    quote: "All my friends are heathens, take it slow. Wait for them to ask you who you know. Please don't make any sudden moves, you don't know half of the abuse.",
    song: "Heathens",
    artists: "Twenty One Pilots",
  },
  {
    quote: "Tell me who's gon' save me from myself, when this life is all I know.",
    song: "Pray For Me",
    artists: "The Weeknd, Kendrick Lamar",
  },
  {
    quote: "Look what you've done. I'm a m*th*rf*ck*ng starboy.",
    song: "Starboy",
    artists: "The Weeknd, Daft Punk",
  },
  {
    quote: "I'm gonna fight them off. A seven nation army couldn't hold me back.",
    song: "Seven Nation Army",
    artists: "The White Stripes",
  },
  {
    quote: "They can say, they can say it all sounds crazy. They can say, they say I've lost my mind. I don't care, I don't care, so call me crazy. We can live in a world that we design.",
    song: "A Million Dreams",
    artists: "Hugh Jackman, Michelle Williams, Ziv Zaifman",
  },
]

export function SongQuoteSection() {
  const [quote, setQuote] = useState<SongQuote | null>(null)

  const pickQuote = () => {
    setQuote((current) => {
      if (SONG_QUOTES.length <= 1) return SONG_QUOTES[0] ?? current
      let next = current
      while (next === current) {
        next = SONG_QUOTES[Math.floor(Math.random() * SONG_QUOTES.length)]
      }
      return next
    })
  }

  useEffect(() => {
    pickQuote()
  }, [])

  return (
    <section className="flex flex-col items-center px-6 pt-4 pb-20">
      <div className="max-w-[1100px] w-full mx-auto flex flex-col md:flex-row items-start gap-10 md:gap-12">
        <h2 className="hero-text md:basis-[20%] md:shrink-0 text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[1.05] text-left">
          <span className="block whitespace-nowrap">Song Quote</span>
          <span className="block whitespace-nowrap">of the Day</span>
        </h2>

        <div className="flex-1 min-w-0 text-left">
          {quote ? (
            <div className="animate-fade-in-up">
              <blockquote className="hero-text text-2xl md:text-3xl font-medium leading-relaxed text-pretty break-words">
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="min-w-0">
                  <p className="hero-text text-lg md:text-xl font-semibold break-words">
                    {quote.song}
                  </p>
                  <p className="mt-1 text-base md:text-lg text-muted-foreground break-words">
                    {quote.artists}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={pickQuote}
                  aria-label="Get a new quote"
                  title="New quote"
                  className="group ml-auto shrink-0 rounded-full p-2 text-muted-foreground transition-colors duration-200 hover:bg-muted-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer active:scale-90"
                >
                  <RotateCw className="size-7 transition-transform duration-300 group-hover:rotate-180 group-active:rotate-180" />
                </button>
              </div>
            </div>
          ) : (
            <div className="min-h-[160px]" aria-hidden />
          )}
        </div>
      </div>
    </section>
  )
}

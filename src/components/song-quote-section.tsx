/**
 * SongQuoteSection
 *
 * What it renders: a "Song Quote of the Day" band - a big two-line heading on the left, and on
 * the right one randomly chosen lyric in quotation marks with its song title and artists
 * underneath, plus a circular refresh button that swaps in a different random quote.
 *
 * Where it appears: nowhere right now. Its import and its usage in `src/app/page.tsx` are both
 * commented out, so this component is currently dormant - the code still compiles and is ready
 * to go, but nothing on the live site renders it. Un-commenting those two lines in `page.tsx`
 * would bring it back.
 *
 * Concepts to notice as a learner:
 *  - the `"use client"` directive, and why interactivity requires it
 *  - a TypeScript `type` alias describing the shape of one object
 *  - `useState` holding "no quote yet" as `null` until the browser picks one
 *  - `useEffect` with an empty dependency array, and why choosing a *random* quote must happen
 *    there instead of during render (otherwise server and client disagree and React reports a
 *    hydration mismatch)
 *  - the updater form of a state setter, `setQuote((current) => ...)`
 *  - conditional rendering with the ternary `? :` operator to reserve space while loading
 */

// "use client" makes this file a Client Component. In the Next.js App Router, components are
// Server Components by default - they render on the server and ship no JavaScript. This one
// needs `useState`, `useEffect`, and an `onClick` handler, all of which only exist in the
// browser, so the directive is required and must be the first statement in the file.
"use client"

// `useState` remembers a value across re-renders; `useEffect` runs code after rendering, in
// the browser only.
import { useEffect, useState } from "react"
// A circular-arrow "refresh" icon from the `lucide-react` library - just a React component
// that renders an <svg>.
import { RotateCw } from "lucide-react"

// A TypeScript `type` alias naming the shape of a single quote entry. It does not create any
// runtime code; it only lets the compiler check that every object in the list below has exactly
// these three string fields, and lets the editor autocomplete `quote.song` and friends.
type SongQuote = {
  // the lyric itself, shown in quotation marks
  quote: string
  // the song title
  song: string
  // comma-separated list of credited artists
  artists: string
}

/**
 * The quote library: a plain array of `SongQuote` objects, roughly a hundred of them, ordered
 * loosely by artist name. `SongQuote[]` means "array of SongQuote", so TypeScript checks every
 * entry for the three required fields and complains about a missing comma or a stray key.
 *
 * How it is consumed: `pickQuote()` below chooses one entry at random by generating an index
 * between 0 and `SONG_QUOTES.length - 1`, and the JSX then reads `.quote`, `.song`, and
 * `.artists` off whichever object was picked. Adding a quote is just appending another object;
 * nothing else needs to change, because all the logic is driven by `SONG_QUOTES.length`.
 *
 * Because this lives at module scope (outside the component), the array is created once when
 * the module loads rather than being rebuilt on every render.
 *
 * Note on the strings: a lyric that itself contains double quotes escapes them as `\"`, since
 * an unescaped `"` would otherwise end the string early. Apostrophes are fine inside double
 * quotes and need no escaping. A one-line comment above each entry names the song and artists,
 * so the list can be skimmed without reading the full lyrics.
 */
// Placeholder quotes - edit this list freely.
const SONG_QUOTES: SongQuote[] = [
  // "We Own It" - 2 Chainz, Wiz Khalifa
  {
    quote: "Couldn't slow down so we had to crash it.",
    song: "We Own It",
    artists: "2 Chainz, Wiz Khalifa",
  },
  // "We Own It" - 2 Chainz, Wiz Khalifa
  {
    quote: "I never feared death or dyin'. I only fear never tryin'. I am whatever I am. Only God can judge me now.",
    song: "We Own It",
    artists: "2 Chainz, Wiz Khalifa",
  },
  // "We Own It" - 2 Chainz, Wiz Khalifa
  {
    quote: "Money's the motivation, money's the conversation.",
    song: "We Own It",
    artists: "2 Chainz, Wiz Khalifa",
  },
  // "My City" - 24kGoldn, Kane Brown, G Herbo
  {
    quote: "Sometimes family and friends, that's the same thing.",
    song: "My City",
    artists: "24kGoldn, Kane Brown, G Herbo",
  },
  // "My City" - 24kGoldn, Kane Brown, G Herbo
  {
    quote: "This one goes out to the ones that feel like an underdog. Used to write me off, now they changing up the dialogue.",
    song: "My City",
    artists: "24kGoldn, Kane Brown, G Herbo",
  },
  // "2 Of Amerikaz Most Wanted" - 2Pac, Snoop Dogg
  {
    quote: "Defeat is not my destiny. Release me to the streets, and keep whatever's left of me.",
    song: "2 Of Amerikaz Most Wanted",
    artists: "2Pac, Snoop Dogg",
  },
  // "If I Can't" - 50 Cent
  {
    quote: "If I can't do it, homie. It can't be done.",
    song: "If I Can't",
    artists: "50 Cent",
  },
  // "Highway to Hell" - AC/DC
  {
    quote: "I'm on the highway to Hell.",
    song: "Highway to Hell",
    artists: "AC/DC",
  },
  // "Dream On" - Aerosmith
  {
    quote: "Sing with me, sing for a year. Sing for the laughter, sing for the tear. Sing with me, if it's just for today. Maybe tomorrow, the good Lord will take you away. Dream on.",
    song: "Dream On",
    artists: "Aerosmith",
  },
  // "3 O'Clock Things" - AJR
  {
    quote: "Would you go running if you saw the real me? Maybe you'd love 'em, yeah, maybe you'd feel me. But I'll never ask you, no that's super scary.",
    song: "3 O'Clock Things",
    artists: "AJR",
  },
  // "Burn The House Down" - AJR
  {
    quote: "Should I keep it light? Stay out of the fight?",
    song: "Burn The House Down",
    artists: "AJR",
  },
  // "Sober Up" - AJR
  {
    quote: "Won't you help me sober up? Growing up, it made me numb, and I wanna feel something again.",
    song: "Sober Up",
    artists: "AJR",
  },
  // "Forever Young" - Alphaville
  {
    quote: "Are you gonna drop the bomb or not? Let us die young or let us live forever. We don't have the power but we never say never.",
    song: "Forever Young",
    artists: "Alphaville",
  },
  // "DNA" - Andrea Bocelli, David Guetta, EJAE, Megan Thee Stallion
  {
    quote: "We'll stand together, we'll stand the pressure. Wave your flags up in the sky, let fate decide. So we say, \"Hey, we're not gonna break, yeah, we're standing here today 'cause it's more than just a game, it's our DNA.\" Yeah, we're shooting for the stars, got fire in our hearts. This is more than just a game, it's our DNA.",
    song: "DNA",
    artists: "Andrea Bocelli, David Guetta, EJAE, Megan Thee Stallion",
  },
  // "Sweet But Psycho" - Ava Max
  {
    quote: "Sweet but a psycho, a little bit psycho.",
    song: "Sweet But Psycho",
    artists: "Ava Max",
  },
  // "The Nights" - Avicii
  {
    quote: "He said, \"One day you'll leave this world behind, so live a life you will remember.\" My father told me when I was just a child, \"These are the nights that never die\"",
    song: "The Nights",
    artists: "Avicii",
  },
  // "Wake Me Up" - Avicii
  {
    quote: "They say I'm caught up in a dream. Well, life will pass me by if I don't open up my eyes. Well, that's fine by me.",
    song: "Wake Me Up",
    artists: "Avicii",
  },
  // "Airplanes" - B.o.B, Hayley Williams
  {
    quote: "Can we pretend that airplanes in the night sky are like shootin' stars? I could really use a wish right now, wish right now, wish right now. Yeah, I could use a dream or a genie or a wish.",
    song: "Airplanes",
    artists: "B.o.B, Hayley Williams",
  },
  // "What's Up Danger" - Blackway, Black Caviar
  {
    quote: "Like what's up danger? Like what's up danger? Don't be a stranger! What's up danger?",
    song: "What's Up Danger",
    artists: "Blackway, Black Caviar",
  },
  // "Livin' On A Prayer" - Bon Jovi
  {
    quote: "Whoa, we're halfway there. Whoa oh, livin' on a prayer.",
    song: "Livin' On A Prayer",
    artists: "Bon Jovi",
  },
  // "Don't Let Me Down" - The Chainsmokers, Daya
  {
    quote: "Crashin, hit a wall. Right now, I need a miracle.",
    song: "Don't Let Me Down",
    artists: "The Chainsmokers, Daya",
  },
  // "Paris" - The Chainsmokers
  {
    quote: "If we go down, then we go down together. They'll say you could do anything. They'll say that I was clever.",
    song: "Paris",
    artists: "The Chainsmokers",
  },
  // "Something Just Like This" - The Chainsmokers, Coldplay
  {
    quote: "I've been reading books of old. The legends and the myths: Achilles and his gold, Hercules and his gifts, Spider-Man's control, and Batman with his fists. And clearly I don't see myself upon that list.",
    song: "Something Just Like This",
    artists: "The Chainsmokers, Coldplay",
  },
  // "Let the World Burn" - Chris Grey
  {
    quote: "I'd let the world burn, let the world burn for you.",
    song: "Let the World Burn",
    artists: "Chris Grey",
  },
  // "Should I Stay Or Should I Go" - The Clash
  {
    quote: "Should I stay, or should I go now? If I go, there will be trouble. And if I stay, it will be double.",
    song: "Should I Stay Or Should I Go",
    artists: "The Clash",
  },
  // "Clocks" - Coldplay
  {
    quote: "Am I a part of the cure? Or am I part of the disease?",
    song: "Clocks",
    artists: "Coldplay",
  },
  // "Hymn For The Weekend" - Coldplay
  {
    quote: "Got me feeling drunk and high.",
    song: "Hymn For The Weekend",
    artists: "Coldplay",
  },
  // "The Scientist" - Coldplay
  {
    quote: "Nobody said it was easy. No one ever said it would be so hard.",
    song: "The Scientist",
    artists: "Coldplay",
  },
  // "Living In A Gangsta's Paradise" - Coolio, L.V.
  {
    quote: "Tell me, why are we so blind to see, that the ones we hurt are you and me?",
    song: "Living In A Gangsta's Paradise",
    artists: "Coolio, L.V.",
  },
  // "Daylight" - David Kushner
  {
    quote: "Hidin' all our sins from the daylight. From the daylight, runnin' from the daylight. From the daylight, runnin' from the daylight. Oh, I love it and I hate it at the same time.",
    song: "Daylight",
    artists: "David Kushner",
  },
  // "I'll Be Missing You" - Diddy, Faith Evans
  {
    quote: "Every step I take, every move I make, every single day, every time I pray, I'll be missing you.",
    song: "I'll Be Missing You",
    artists: "Diddy, Faith Evans",
  },
  // "God's Plan" - Drake
  {
    quote: "Tryna keep it peaceful is a struggle for me.",
    song: "God's Plan",
    artists: "Drake",
  },
  // "Hotel California" - Eagles
  {
    quote: "Welcome to the Hotel California! Such a lovely place, such a lovely face.",
    song: "Hotel California",
    artists: "Eagles",
  },
  // "Bad Habits" - Ed Sheeran
  {
    quote: "My bad habits lead to late nights endin' alone, conversations with a stranger I barely know. Swearin' this will be the last, but it probably won't. I got nothing left to lose, or use, or do.",
    song: "Bad Habits",
    artists: "Ed Sheeran",
  },
  // "Remember the Name" - Ed Sheeran, 50 Cent, Eminem
  {
    quote: "And if you're talking money, then my conversation's shiftin. My dreams are bigger than just bein' on the rich list. Might be insanity, but people call it \"Gifted.\" My face is going numb from the sh*t this stuff is mixed with.",
    song: "Remember the Name",
    artists: "Ed Sheeran, 50 Cent, Eminem",
  },
  // "Remember the Name" - Ed Sheeran, 50 Cent, Eminem
  {
    quote: "The thought that I would stop when I'm dead just popped in my head. I said it, then forget what I said.",
    song: "Remember the Name",
    artists: "Ed Sheeran, 50 Cent, Eminem",
  },
  // "Numb Little Bug" - Em Beihold
  {
    quote: "Do you ever get a little bit tired of life? Like you're not really happy but you don't wanna die?",
    song: "Numb Little Bug",
    artists: "Em Beihold",
  },
  // Unused earlier draft: an entry that was commented out rather than deleted, so it is skipped.
  //   {
  //     quote: "Go to sleep, b*tch, why are you still alive? How many times I gotta say, \"Close your eyes\"? And go to sleep, b*tch, die, m*th*rf*ck*r, die. Bye, bye, m*th*rf*ck*r, bye, bye.",
  //     song: "Go To Sleep",
  //     artists: "Eminem, Obie Trice, DMX",
  //   },
  // "Godzilla" - Eminem
  {
    quote: "You get in my way, I'mma feed you to the monster. I'm normal during the day, but at night, turn to a monster.",
    song: "Godzilla",
    artists: "Eminem",
  },
  // "Lose Yourself" - Eminem
  {
    quote: "No more games, I'mma change what you call rage, tear this m*th*rf*ck*ng roof off like two dogs caged. I was playin' in the beginning, the mood all changed. I've been chewed up, and spit out, and booed off stage, but I kept rhymin' and stepped right in the next cypher.",
    song: "Lose Yourself",
    artists: "Eminem",
  },
  // "Lose Yourself" - Eminem
  {
    quote: "This world is mine for the taking. Make me king.",
    song: "Lose Yourself",
    artists: "Eminem",
  },
  // "Lose Yourself" - Eminem
  {
    quote: "You better lose yourself in the music. The moment, you own it, you better never let it go. You only get one shot, do not miss your chance to blow. This opportunity comes once in a lifetime, yo.",
    song: "Lose Yourself",
    artists: "Eminem",
  },
  // "The Monster" - Eminem, Rihanna
  {
    quote: "I'm friends with the monster that's under my bed. Get along with the voices inside of my head. You're tryin' to save me, stop holding your breath, and you think I'm crazy, you, you think I'm crazy.",
    song: "The Monster",
    artists: "Eminem, Rihanna",
  },
  // "Not Afraid" - Eminem
  {
    quote: "I'm not afraid to take a stand.",
    song: "Not Afraid",
    artists: "Eminem",
  },
  // "Rap God" - Eminem
  {
    quote: "Don't be a r*t*rd, be a king? Think not, why be a king when you can be a god?",
    song: "Rap God",
    artists: "Eminem",
  },
  // "The Real Slim Shady" - Eminem
  {
    quote: "I'm Slim Shady, yes, I'm the real Shady. All you other Slim Shadys are just imitating.",
    song: "The Real Slim Shady",
    artists: "Eminem",
  },
  // "River" - Eminem, Ed Sheeran
  {
    quote: "I've been a liar, been a thief. Been a lover, been a cheat. All my sins need holy water, feel it washin' over me.",
    song: "River",
    artists: "Eminem, Ed Sheeran",
  },
  // "Till I Collapse" - Eminem, Nate Dogg
  {
    quote: "Till I collapse, I'm spillin' these raps long as you feel 'em. Till the day that I drop, you'll never say that I'm not killin' em.",
    song: "Till I Collapse",
    artists: "Eminem, Nate Dogg",
  },
  // "Venom" - Eminem
  {
    quote: "Venom adrenaline momentum, and I'm not knowin' when I'm ever gonna slow up and I'm ready to snap any moment, I'm thinkin' it's time to go get 'em. They ain't gonna know what hit 'em.",
    song: "Venom",
    artists: "Eminem",
  },
  // "Without Me" - Eminem
  {
    quote: "Now, this looks like a job for me. So, everybody, just follow me, cause we need a little controversy, cause it feels so empty without me.",
    song: "Without Me",
    artists: "Eminem",
  },
  // "Sweet Dreams" - Eurythmics
  {
    quote: "Sweet dreams are made of this, who am I to disagree? I travel the world and the seven seas. Everybody's looking for something.",
    song: "Sweet Dreams",
    artists: "Eurythmics",
  },
  // "Bring Me To Life" - Evanescence
  {
    quote: "Wake me up inside. Call my name and save me from the dark. Bid my blood to run, before I come undone. Save me from the nothin' I've become.",
    song: "Bring Me To Life",
    artists: "Evanescence",
  },
  // "Centuries" - Fall Out Boy
  {
    quote: "Some legends are told, some turn to dust or to gold, but you will remember me. Remember me for centuries.",
    song: "Centuries",
    artists: "Fall Out Boy",
  },
  // "Immortals" - Fall Out Boy
  {
    quote: "They say we are what we are, but we don't have to be.",
    song: "Immortals",
    artists: "Fall Out Boy",
  },
  // "Remember The Name" - Fort Minor, Styles of Beyond
  {
    quote: "This is 10% luck, 20% skill, 15% concentrated power of will, 5% pleasure, 50% pain, and 100% reason to remember the name.",
    song: "Remember The Name",
    artists: "Fort Minor, Styles of Beyond",
  },
  // "We Are Young" - Fun, Janelle Monáe
  {
    quote: "Tonight, we are young, so let's set the world on fire. We can burn brighter than the sun.",
    song: "We Are Young",
    artists: "Fun, Janelle Monáe",
  },
  // "Iris" - Goo Goo Dolls
  {
    quote: "And I don't want the world to see me, cause I don't think that they'd understand. When everything's made to be broken, I just want you to know who I am.",
    song: "Iris",
    artists: "Goo Goo Dolls",
  },
  // "Basket Case" - Green Day
  {
    quote: "Sometimes I give myself the creeps, sometimes my mind plays tricks on me.",
    song: "Basket Case",
    artists: "Green Day",
  },
  // "Boulevard Of Broken Dreams" - Green Day
  {
    quote: "I walk a lonely road. The only one that I have ever known. Don't know where it goes, but it's home to me and I walk alone.",
    song: "Boulevard Of Broken Dreams",
    artists: "Green Day",
  },
  // "Paradise City" - Guns N' Roses
  {
    quote: "Take me down to the paradise city, where the grass is green and the girls are pretty.",
    song: "Paradise City",
    artists: "Guns N' Roses",
  },
  // "Welcome To The Jungle" - Guns N' Roses
  {
    quote: "Welcome to the jungle, we got fun and games. We got everything you want, we know the names. We are the people that can find whatever you may need, if you got the money, honey, we got your disease.",
    song: "Welcome To The Jungle",
    artists: "Guns N' Roses",
  },
  // "Take Me To Church" - Hozier
  {
    quote: "Take me to church. I'll worship like a dog at the shrine of your lies. I'll tell you my sins and you can sharpen your knife. Offer me that deathless death.",
    song: "Take Me To Church",
    artists: "Hozier",
  },
  // "A Million Dreams" - Hugh Jackman, Michelle Williams, Ziv Zaifman
  {
    quote: "They can say, they can say it all sounds crazy. They can say, they say I've lost my mind. I don't care, I don't care, so call me crazy. We can live in a world that we design.",
    song: "A Million Dreams",
    artists: "Hugh Jackman, Michelle Williams, Ziv Zaifman",
  },
  // "The Other Side" - Hugh Jackman, Zac Efron
  {
    quote: "If it's crazy, live a little crazy. You can play it sensible, a king of conventional, or you can risk it all and see.",
    song: "The Other Side",
    artists: "Hugh Jackman, Zac Efron",
  },
  // "Bad Liar" - Imagine Dragons
  {
    quote: "Look me in the eyes, tell me what you see. Perfect paradise, tearing at the seams?",
    song: "Bad Liar",
    artists: "Imagine Dragons",
  },
  // "Believer" - Imagine Dragons
  {
    quote: "My love, my life, my drive, it came from PAIN!",
    song: "Believer",
    artists: "Imagine Dragons",
  },
  // "Bones" - Imagine Dragons
  {
    quote: "Our patience is waning, is this entertaining? I got this feeling, yeah, you know, where I'm losing all control, cause there's magic in my bones.",
    song: "Bones",
    artists: "Imagine Dragons",
  },
  // "Demons" - Imagine Dragons
  {
    quote: "I wanna hide the truth, I wanna shelter you, but with the beast inside, there's nowhere we can hide. No matter what we breed, we are still made of greed. This is my kingdom come, this is my kingdom come.",
    song: "Demons",
    artists: "Imagine Dragons",
  },
  // "Enemy" - Imagine Dragons, JID
  {
    quote: "Oh, the misery, everybody wants to be my enemy. Spare the sympathy, everybody wants to be my enemy.",
    song: "Enemy",
    artists: "Imagine Dragons, JID",
  },
  // "Follow You" - Imagine Dragons
  {
    quote: "I will follow you down wherever you may go. I'll follow you way down to your deepest low. I'll always be around wherever life takes you. You know I'll follow you.",
    song: "Follow You",
    artists: "Imagine Dragons",
  },
  // "It's Time" - Imagine Dragons
  {
    quote: "So this is where you fell, and I am left to sell. The path to heaven runs through miles of clouded hell.",
    song: "It's Time",
    artists: "Imagine Dragons",
  },
  // "Natural" - Imagine Dragons
  {
    quote: "That's the price you pay, leave behind your heart and cast away. Just another product of today, rather be the hunter than the prey, and you're standing on the edge, face up, cause you're a natural! A beating heart of stone, you gotta be so cold, to make it in this world.",
    song: "Natural",
    artists: "Imagine Dragons",
  },
  // "On Top Of The World" - Imagine Dragons
  {
    quote: "I'm on top of the world.",
    song: "On Top Of The World",
    artists: "Imagine Dragons",
  },
  // "Radioactive" - Imagine Dragons
  {
    quote: "I'm waking up, I feel it in my bones, enough to make my system blow. Welcome to the new age, to the new age.",
    song: "Radioactive",
    artists: "Imagine Dragons",
  },
  // "Sharks" - Imagine Dragons
  {
    quote: "You think you're better than them, you think they're really your friends, but when it comes to the end, you're just the same as them.",
    song: "Sharks",
    artists: "Imagine Dragons",
  },
  // "Thunder" - Imagine Dragons
  {
    quote: "Just a young gun with a quick fuse, I was uptight, wanna let loose. I was dreaming of bigger things and wanna leave my own life behind. Not a \"Yes, sir,\" not a follower.",
    song: "Thunder",
    artists: "Imagine Dragons",
  },
  // "Warriors" - Imagine Dragons
  {
    quote: "In youth, you'd lay awake at night and scheme, of all the things that you would change, but it was just a dream.",
    song: "Warriors",
    artists: "Imagine Dragons",
  },
  // "Whatever It Takes" - Imagine Dragons
  {
    quote: "Cause I love the adrenaline in my veins, I do whatever it takes.",
    song: "Whatever It Takes",
    artists: "Imagine Dragons",
  },
  // "Numb / Encore" - JAŸ-Z, Linkin Park
  {
    quote: "Can I get an encore? Do you want more? I've become so numb, so for one last time I need y'all to roar. One last time I need y'all to roar.",
    song: "Numb / Encore",
    artists: "JAŸ-Z, Linkin Park",
  },
  // "Run This Town" - JAŸ-Z, Rihanna, Kanye West
  {
    quote: "Life's a game, but it's not fair. I break the rules so I don't care, so I keep doin' my own thing.",
    song: "Run This Town",
    artists: "JAŸ-Z, Rihanna, Kanye West",
  },
  // "Imagine" - John Lennon
  {
    quote: "Imagine all the people, livin' life in peace.",
    song: "Imagine",
    artists: "John Lennon",
  },
  // "Don't Stop Believin'" - Journey
  {
    quote: "Don't stop believin', hold on to that feelin'.",
    song: "Don't Stop Believin'",
    artists: "Journey",
  },
  // "Wavin' Flag" - K'naan
  {
    quote: "When I get older, I will be stronger. They'll call me freedom, just like a wavin' flag.",
    song: "Wavin' Flag",
    artists: "K'naan",
  },
  // "Way Down We Go" - KALEO
  {
    quote: "We get what we deserve.",
    song: "Way Down We Go",
    artists: "KALEO",
  },
  // "Star Walkin'" - Lil Nas X
  {
    quote: "Don't ever say it's over if I'm breathin'. Racin' to the moonlight and I'm speedin'. I'm headed to the stars, ready to go far. I'm star walkin'",
    song: "Star Walkin'",
    artists: "Lil Nas X",
  },
  // "Scared Of The Dark" - Lil Wayne, Ty Dolla $ign, XXXTentacion
  {
    quote: "I ain't never scared and I ain't never horrified. I just look down at my Rolex, it said it's the darkest times. I ain't never terrified, I ain't never petrified. You know I see dead people, I just tell them, \"Get a life.\"",
    song: "Scared Of The Dark",
    artists: "Lil Wayne, Ty Dolla $ign, XXXTentacion",
  },
  // "Scared Of The Dark" - Lil Wayne, Ty Dolla $ign, XXXTentacion
  {
    quote: "I'm not scared of the dark. I'm not running, running, running. No, I'm not afraid of the fall. Why would a star, a star ever be afraid of the dark?",
    song: "Scared Of The Dark",
    artists: "Lil Wayne, Ty Dolla $ign, XXXTentacion",
  },
  // "Sucker For Pain" - Lil Wayne, Wiz Khalifa, Imagine Dragons, Logic, Ty Dolla $ign
  {
    quote: "Feelin' the world go against us, so we put the world on our shoulders.",
    song: "Sucker For Pain",
    artists: "Lil Wayne, Wiz Khalifa, Imagine Dragons, Logic, Ty Dolla $ign",
  },
  // "In The End" - Linkin Park
  {
    quote: "I tried so hard and got so far, but in the end, it doesn't even matter. I had to fall to lose it all.",
    song: "In The End",
    artists: "Linkin Park",
  },
  // "Can't Hold Us" - Macklemore, Ryan Lewis
  {
    quote: "Tonight is the night, we'll fight till it's over, so we put our hands up like the ceiling can't hold us.",
    song: "Can't Hold Us",
    artists: "Macklemore, Ryan Lewis",
  },
  // "Glorious" - Macklemore, Skylar Grey
  {
    quote: "I heard you die twice, once when they bury you in the grave and the second time is the last time that somebody mentions your name.",
    song: "Glorious",
    artists: "Macklemore, Skylar Grey",
  },
  // "Devil In Disguise" - Marino
  {
    quote: "She said, \"You think the devil has horns? Well, so did I, but I was wrong. His hair is combed and wears a suit and tie. He's nice, polite, he'll catch you by surprise. A smile so bright, you'd never bat an eye.\"",
    song: "Devil In Disguise",
    artists: "Marino",
  },
  // "Memories" - Maroon 5
  {
    quote: "Here's to the ones that we got. Cheers to the wish you were here, but you're not, 'cause the drinks bring back all the memories of everything we've been through.",
    song: "Memories",
    artists: "Maroon 5",
  },
  // "Astronaut In The Ocean" - Masked Wolf
  {
    quote: "I feel like an astronaut in the ocean.",
    song: "Astronaut In The Ocean",
    artists: "Masked Wolf",
  },
  // "Home" - mgk, X Ambassadors, Bebe Rexha
  {
    quote: "Now tell me, how did all my dreams turn to nightmares? How did I lose it when I was right there? Now I'm so far that it feels like it's all gone to pieces. Tell me why the world never fights fair?",
    song: "Home",
    artists: "mgk, X Ambassadors, Bebe Rexha",
  },
  // "Invincible" - mgk, Ester Dean
  {
    quote: "Voices in the air. I hear 'em loud and clear telling me to listen. Whispers in my ear. Nothing can compare, I just wanna listen. Telling me, I'm invincible.",
    song: "Invincible",
    artists: "mgk, Ester Dean",
  },
  // "FEAR" - NF
  {
    quote: "Is this what you wanted?",
    song: "FEAR",
    artists: "NF",
  },
  // "HOPE" - NF
  {
    quote: "What's my definition of success? Listening to what your heart says. Standing up for what you know is right, while everybody else is tucking their tail between their legs. What's my definition of success? Crafting something no one else can. Being brave enough to dream big.",
    song: "HOPE",
    artists: "NF",
  },
  // "The Search" - NF
  {
    quote: "You can call me what you wanna, but you can never call me forgettable.",
    song: "The Search",
    artists: "NF",
  },
  // "You're Gonna Go Far, Kid" - The Offspring
  {
    quote: "With a thousand lies and a good disguise, hit 'em right between the eyes.",
    song: "You're Gonna Go Far, Kid",
    artists: "The Offspring",
  },
  // "Drag Me Down" - One Direction
  {
    quote: "I've got fire for a heart. I'm not scared of the dark. You've never seen it look so easy.",
    song: "Drag Me Down",
    artists: "One Direction",
  },
  // "Crazy Train" - Ozzy Osbourne
  {
    quote: "Mental wounds not healing, life's a bitter shame. I'm going off the rails on a crazy train.",
    song: "Crazy Train",
    artists: "Ozzy Osbourne",
  },
  // "No More Tears" - Ozzy Osbourne
  {
    quote: "I close my eyes and wait to hear the sound of someone screaming here. No more tears.",
    song: "No More Tears",
    artists: "Ozzy Osbourne",
  },
  // "High Hopes" - Panic! At The Disco
  {
    quote: "Had to have high, high hopes for a living. Didn't know how, but I always had a feeling. I was gonna be that one in a million.",
    song: "High Hopes",
    artists: "Panic! At The Disco",
  },
  // "Bohemian Rhapsody" - Queen
  {
    quote: "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality.",
    song: "Bohemian Rhapsody",
    artists: "Queen",
  },
  // "Losing My Religion" - R.E.M.
  {
    quote: "That's me in the corner, that's me in the spotlight, losing my religion.",
    song: "Losing My Religion",
    artists: "R.E.M.",
  },
  // "Human" - Rag'n'Bone Man
  {
    quote: "Maybe I'm foolish, maybe I'm blind. Thinkin' I can see through this and see what's behind, got no way to prove it, so maybe I'm lyin'. But I'm only human after all, I'm only human after all. Don't put your blame on me.",
    song: "Human",
    artists: "Rag'n'Bone Man",
  },
  // "Californication" - Red Hot Chili Peppers
  {
    quote: "Dream of Californication",
    song: "Californication",
    artists: "Red Hot Chili Peppers",
  },
  // "Dani California" - Red Hot Chili Peppers
  {
    quote: "California, rest in peace.",
    song: "Dani California",
    artists: "Red Hot Chili Peppers",
  },
  // "Umbrella" - Rihanna, JAŸ-Z
  {
    quote: "Said I'll always be your friend. Took an oath, I'mma stick it out to the end.",
    song: "Umbrella",
    artists: "Rihanna, JAŸ-Z",
  },
  // "Legends Are Made" - Sam Tinnesz
  {
    quote: "There is no time to waste. I've got that lightnin' inside me. This is how legends are made.",
    song: "Legends Are Made",
    artists: "Sam Tinnesz",
  },
  // "Glory" - The Score
  {
    quote: "This is not another story. This is not another drill. I refuse to be another number now, never staying down. This is something real. I'm a name that you'll remember. I am more than just a thrill. I am gonna be the greatest ever now, watch out, I'm a force that you will feel.",
    song: "Glory",
    artists: "The Score",
  },
  // "Legends" - The Score
  {
    quote: "Won't stop till we're legend. Blood, sweat, I'll break my bones till all my scars bleed golden. My name's forever known.",
    song: "Legends",
    artists: "The Score",
  },
  // "Unstoppable" - The Score
  {
    quote: "We can be heroes everywhere we go. We can have all that we ever want. Swinging like Ali, knocking out bodies, standing on top like a champion. Keep your silver, give me that gold. You will remember when I say, we can be heroes everywhere we go. Keeping us down is impossible, cause we're unstoppable.",
    song: "Unstoppable",
    artists: "The Score",
  },
  // "Hall of Fame" - The Script, Will.I.Am
  {
    quote: "Yeah, you can be the greatest, you can be the best. You can be the King Kong bangin' on your chest. You can beat the world, you can win the war. You can talk to God, go banging on his door.",
    song: "Hall of Fame",
    artists: "The Script, Will.I.Am",
  },
  // "The Hanging Tree" - Suzanne Collins, James Newton Howard, Wesley Schultz, Jeremiah Fraites
  {
    quote: "Are you, are you, coming to the tree? They strung up a man, they say who murdered three. Strange things did happen here, no stranger would it be, if we met at midnight in the hanging tree.",
    song: "The Hanging Tree",
    artists: "Suzanne Collins, James Newton Howard, Wesley Schultz, Jeremiah Fraites",
  },
  // "Lose Control" - Teddy Swims
  {
    quote: "Something's got a hold of me lately. No, I don't know myself anymore. Feels like the walls are all closin' in, and the devil's knockin' at my door.",
    song: "Lose Control",
    artists: "Teddy Swims",
  },
  // "Fly Away" - TheFatRat, Anjulie
  {
    quote: "Don't you be afraid, everything will change. You and I jumping off the edge. They say dreamers never die, so come and fly, come and fly. Come and fly away with me.",
    song: "Fly Away",
    artists: "TheFatRat, Anjulie",
  },
  // "Rise Up" - TheFatRat
  {
    quote: "When you feel it's hopeless, when you think that you lost, I will take your hand and we'll rise up from the dust.",
    song: "Rise Up",
    artists: "TheFatRat",
  },
  // "Enemy" - Tommee Profitt, Beacon Light, Sam Tinnesz
  {
    quote: "I see who you are, you are my enemy. My enemy, you are my enemy.",
    song: "Enemy",
    artists: "Tommee Profitt, Beacon Light, Sam Tinnesz",
  },
  // "Heathens" - Twenty One Pilots
  {
    quote: "All my friends are heathens, take it slow. Wait for them to ask you who you know. Please don't make any sudden moves, you don't know half of the abuse.",
    song: "Heathens",
    artists: "Twenty One Pilots",
  },
  // "Ride" - Twenty One Pilots
  {
    quote: "I've been thinkin' too much, help me.",
    song: "Ride",
    artists: "Twenty One Pilots",
  },
  // "Stressed Out" - Twenty One Pilots
  {
    quote: "Wish we could turn back time to the good old days.",
    song: "Stressed Out",
    artists: "Twenty One Pilots",
  },
  // "Pray For Me" - The Weeknd, Kendrick Lamar
  {
    quote: "I'm always ready for a war again, go down that road again. It's all the same. I'm always ready to take a life again, you know I'll read again. It's all the same.",
    song: "Pray For Me",
    artists: "The Weeknd, Kendrick Lamar",
  },
  // "Pray For Me" - The Weeknd, Kendrick Lamar
  {
    quote: "Tell me who's gon' save me from myself, when this life is all I know.",
    song: "Pray For Me",
    artists: "The Weeknd, Kendrick Lamar",
  },
  // "Pray For Me" - The Weeknd, Kendrick Lamar
  {
    quote: "Who gon' pray for me? Take my pain for me? Save my soul for me? 'Cause I'm alone, you see. If I'm gon' die for you, if I'm gon' kill for you, then I'll spill this blood for you.",
    song: "Pray For Me",
    artists: "The Weeknd, Kendrick Lamar",
  },
  // "Starboy" - The Weeknd, Daft Punk
  {
    quote: "Look what you've done. I'm a m*th*rf*ck*ng starboy.",
    song: "Starboy",
    artists: "The Weeknd, Daft Punk",
  },
  // "Seven Nation Army" - The White Stripes
  {
    quote: "I'm gonna fight them off. A seven nation army couldn't hold me back.",
    song: "Seven Nation Army",
    artists: "The White Stripes",
  },

]

// The exported component. It takes no props - everything it needs is the module-level quote
// list plus its own state.
export function SongQuoteSection() {
  // The currently displayed quote. The type argument `<SongQuote | null>` is a union type: this
  // state holds either a quote object or `null`. It starts as `null` to mean "nothing chosen
  // yet", which is what the server and the very first client render both show. The JSX at the
  // bottom uses that `null` to render a blank spacer instead of text.
  const [quote, setQuote] = useState<SongQuote | null>(null)

  // Choose a new random quote. Used both by the effect below (for the initial pick) and by the
  // refresh button's onClick.
  const pickQuote = () => {
    // The *updater* form of a state setter: instead of passing a new value, pass a function.
    // React calls it with the latest current state and stores whatever it returns. That is what
    // makes it possible to compare against the quote already on screen.
    setQuote((current) => {
      // Guard against the pathological cases. With one quote (or none) there is no "different"
      // quote to find, and the loop below would spin forever. `SONG_QUOTES[0] ?? current` reads
      // as "the first quote, or if there isn't one, just keep what we already had".
      if (SONG_QUOTES.length <= 1) return SONG_QUOTES[0] ?? current
      // Start from the current quote so the loop condition is true at least once on a refresh.
      let next = current
      // Keep rolling until we land on something that is not the quote already displayed, so
      // clicking refresh always visibly changes the text. `===` compares object identity here,
      // which works because every entry is a distinct object in the array.
      while (next === current) {
        // `Math.random()` gives a decimal in [0, 1). Multiplying by the array length and
        // flooring it turns that into a valid index from 0 to length - 1.
        next = SONG_QUOTES[Math.floor(Math.random() * SONG_QUOTES.length)]
      }
      return next
    })
  }

  // Make the first pick after the component has mounted in the browser.
  //
  // Why this cannot happen during render: the page is pre-rendered on the server and then
  // hydrated in the browser. If the initial quote were rolled while rendering, the server would
  // pick one lyric and the browser would pick a different one, React would notice the HTML it
  // received does not match what it just computed, and it would report a hydration mismatch.
  // Render has to be deterministic, so the random choice is deferred to an effect, which only
  // ever runs on the client and only after React has finished comparing.
  //
  // The `[]` is the dependency array: empty means "run once after the first render". Listing
  // values there would make the effect re-run whenever one of them changed; omitting the array
  // entirely would run it after every single render. No cleanup function is returned because
  // this effect starts nothing ongoing - if it had set up a timer or an event listener, it would
  // return a function that tore that down, which React calls on unmount and before re-runs.
  useEffect(() => {
    pickQuote()
  }, [])

  return (
    // The outer band of the page: a centred column with side padding, a little space on top and
    // a generous amount below.
    <section className="flex flex-col items-center px-6 pt-4 pb-20">
      {/* The content row, capped at 1100px and centred. It stacks vertically on phones and turns
          into two side-by-side columns from the `md:` breakpoint up, aligned to their tops. */}
      <div className="max-w-[1100px] w-full mx-auto flex flex-col md:flex-row items-start gap-10 md:gap-12">
        {/* The heading column. `md:basis-[20%]` gives it a fifth of the row's width and
            `md:shrink-0` stops flexbox from squeezing it narrower; the rest of the classes scale
            the font up at each breakpoint and tighten the line height for a poster-like look. */}
        <h2 className="hero-text md:basis-[20%] md:shrink-0 text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight leading-[1.05] text-left">
          {/* Two <span>s made `block` so the title always breaks after "Song Quote", with
              `whitespace-nowrap` preventing either half from wrapping mid-phrase. */}
          <span className="block whitespace-nowrap">Song Quote</span>
          <span className="block whitespace-nowrap">of the Day</span>
        </h2>

        {/* The quote column. `flex-1` lets it take all the leftover width, and `min-w-0` is the
            standard flexbox fix that allows long words to wrap instead of overflowing. */}
        <div className="flex-1 min-w-0 text-left">
          {/* Conditional rendering with the ternary operator: `condition ? a : b`. JSX has no
              `if` statement inside braces, so this is the usual way to choose between two trees.
              `quote` is `null` until the effect runs, and `null` is falsy, so the placeholder
              branch shows first and the real content appears once a quote has been chosen. */}
          {quote ? (
            // A project-defined animation class that fades and slides the quote in. Because the
            // element only mounts once `quote` becomes non-null, the animation plays on arrival.
            <div className="animate-fade-in-up">
              {/* <blockquote> is the semantically correct element for a quotation. The classes
                  make it the largest text in the block; `text-pretty` improves line breaking and
                  `break-words` lets very long words wrap rather than spill out. */}
              <blockquote className="hero-text text-2xl md:text-3xl font-medium leading-relaxed text-pretty break-words">
                {/* `&ldquo;` and `&rdquo;` are HTML entities for curly opening and closing
                    quotation marks - typographically nicer than plain ". Between them,
                    `{quote.quote}` reads the lyric off the chosen object. */}
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              {/* The attribution row below the lyric: text on the left, refresh button pushed to
                  the far right, vertically centred with a small gap. */}
              <div className="mt-6 flex items-center gap-3">
                {/* Wrapper for the two lines of attribution; `min-w-0` again so long artist
                    lists wrap instead of stretching the row. */}
                <div className="min-w-0">
                  {/* The song title, bolder and larger than the artist line. */}
                  <p className="hero-text text-lg md:text-xl font-semibold break-words">
                    {quote.song}
                  </p>
                  {/* The artists, in the muted secondary colour with a little space above. */}
                  <p className="mt-1 text-base md:text-lg text-muted-foreground break-words">
                    {quote.artists}
                  </p>
                </div>
                {/* The refresh button. `type="button"` keeps it from acting as a form submit;
                    `onClick={pickQuote}` passes the function itself rather than calling it;
                    `aria-label` names it for screen readers (it has no text, only an icon) and
                    `title` supplies the hover tooltip. The classes make it a circular icon
                    target, use `ml-auto` to shove it to the right end of the flex row, add hover
                    and keyboard-focus styling, and shrink it slightly while pressed. `group`
                    lets the icon inside respond to hovering the button. */}
                <button
                  type="button"
                  onClick={pickQuote}
                  aria-label="Get a new quote"
                  title="New quote"
                  className="group ml-auto shrink-0 rounded-full p-2 text-muted-foreground transition-colors duration-200 hover:bg-muted-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer active:scale-90"
                >
                  {/* The circular-arrow icon, spun half a turn over 300ms when the button is
                      hovered or held - a nice hint that clicking will reload the quote. */}
                  <RotateCw className="size-7 transition-transform duration-300 group-hover:rotate-180 group-active:rotate-180" />
                </button>
              </div>
            </div>
          ) : (
            // The "no quote yet" branch: an empty box about as tall as a real quote. Reserving
            // the height means the rest of the page does not jump down when the quote appears.
            // `aria-hidden` keeps this meaningless spacer out of the screen-reader tree, and the
            // self-closing `/>` is how an element with no children is written in JSX.
            <div className="min-h-[160px]" aria-hidden />
          )}
        </div>
      </div>
    </section>
  )
}

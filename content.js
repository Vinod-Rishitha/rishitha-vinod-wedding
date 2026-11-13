/*
  Everything the invitation says lives here.
  To change a name, time or line of text, edit it in BOTH "en" and "te".
  Most of the wording follows the families' printed card.

  - A value starting with "TODO" shows up highlighted on the page.
    The site must not be shared while any TODO is left.
  - An empty value ("") hides that line in that language.
  - "\n" starts a new line.

  Optional sections:
    - photos: image files in assets/photos/gallery/. Empty list = no gallery.
              They're laid out as a collage on a grid 4 squares wide.
              "w" and "h" are how many squares wide and tall each photo is;
              "focus" is the part of the photo to keep in view when it's
              trimmed to fit. The sizes below fit together into a rectangle
              (20 squares = 4 wide × 5 tall), so the collage ends flush.
              If you add or remove a photo, keep the total a multiple of 4.
    - music:  path to an MP3 you have the rights to. null = no background music.
*/
window.INVITE = {
  siteUrl: "https://vinod-rishitha.github.io/rishitha-vinod-wedding/",

  // India time (IST, +05:30). Used for the countdown and calendar entries.
  events: {
    reception: { start: "2026-12-02T19:00:00+05:30", end: "2026-12-02T22:00:00+05:30" },
    muhurtham: { start: "2026-12-03T04:00:00+05:30", end: "2026-12-03T05:00:00+05:30" },
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("S.R Convention, Old Thiruchanoor Road, Tirupati"),

  photos: [
    // ┌─────────────┬───┐
    // │ ring 3×2    │1×2│   rows 1–2
    // ├─────────────┴───┤
    // │ bouquet 4×2     │   rows 3–4
    // ├────────┬────────┤
    // │ hands  │ 2×1    │   row 5
    // └────────┴────────┘
    // 20 squares = 4 wide × 5 tall
    { src: "assets/photos/gallery/08.jpg", w: 3, h: 2, focus: "50% 50%", alt: "Vinod Sai slipping a ring onto Rishitha's finger in front of the flower stage" },
    { src: "assets/photos/gallery/03.jpg", w: 1, h: 2, focus: "68% 35%", alt: "Rishitha smiling at Vinod Sai" },
    { src: "assets/photos/gallery/05.jpg", w: 4, h: 2, focus: "50% 30%", alt: "Vinod Sai, garlanded, kneeling to give Rishitha a bouquet of red roses" },
    { src: "assets/photos/gallery/04.jpg", w: 2, h: 1, focus: "50% 88%", alt: "Vinod Sai placing a ring on Rishitha's open palm" },
    { src: "assets/photos/gallery/01.jpg", w: 2, h: 1, focus: "50% 20%", alt: "Vinod Sai and Rishitha with their foreheads touching" },
  ],

  // A 25-second clip chosen by the family. It loops for as long as the page is open.
  music: "assets/music/wedding-song.mp3",

  text: {
    en: {
      pageTitle: "Rishitha & Vinod Sai · Wedding · 2 & 3 December 2026",
      langName: "English",
      invocation: "Srirasthu! Subhamasthu! Kalyanamasthu!",
      bride: "Rishitha",
      groom: "Vinod Sai",
      coverWhen: "Tirupati, 2 & 3 December 2026",
      openInvitation: "Open invitation",

      inviteLine: "We cordially invite you to grace the auspicious wedding ceremony of",
      brideHonorific: "Chi. La. Sow.",
      brideFull: "S. Rishitha",
      brideIntro: "B.Tech.\nSoftware Engineer",
      groomHonorific: "Chi.",
      groomFull: "M. Vinod Sai",
      groomIntro: "B.Tech., MBA (IIM Shillong)\nSenior Manager, JSW",
      photoAlt: "Vinod Sai holding Rishitha's hand as they smile at each other on the flower stage",

      blessingsTitle: "With the blessings of",
      bridesParentsLabel: "Bride's parents",
      bridesParents: "Smt. P. Radhika & Sri S.V. Madhusudhan",
      bridesHome: "Bhanu Nagar, Avilala, Tirupati",
      bridesGrandparents: "",
      groomsParentsLabel: "Groom's parents",
      groomsParents: "Smt. M. Padmavathi & Sri M. Madhan Mohan",
      groomsHome: "Upadhya Nagar, Tirupati",

      eventsTitle: "The celebrations",
      receptionName: "Reception & dinner",
      receptionDate: "Wednesday, 2 December 2026",
      receptionTime: "7:00 PM onwards",
      muhurthamName: "Subha muhurtham",
      muhurthamDate: "Thursday, 3 December 2026",
      muhurthamTime: "4:00 AM to 5:00 AM",
      muhurthamNote: "In Subha Thula Lagnam, in the early hours right after the reception night.",
      addGoogle: "Google Calendar",
      addIcs: "iPhone or Outlook",
      addToCalendar: "Add to calendar",

      countdownTitle: "Until the muhurtham",
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      countdownDone: "The muhurtham has taken place. Thank you for your blessings.",

      photosTitle: "Photos",
      closePhoto: "Close photo",
      prevPhoto: "Previous photo",
      nextPhoto: "Next photo",

      venueTitle: "Venue",
      venueName: "S.R Convention",
      venueAddress: "Old Thiruchanoor Road, Near Ankalamma Temple, Tirupati",
      directions: "Get directions",

      shareTitle: "Share the invitation",
      shareWhatsApp: "Share on WhatsApp",
      downloadCard: "Download the invitation card",
      downloadPrinted: "Download the printed card",
      shareMessage:
        "You're invited to the wedding of Rishitha & Vinod Sai in Tirupati on 2 & 3 December 2026.",

      closingLine: "Do join us with family and friends, and bless the couple.",
      signoff: "With best compliments from relatives & friends",

      musicOn: "Play music",
      musicOff: "Pause music",
    },

    te: {
      pageTitle: "రిషిత & వినోద్ సాయి · వివాహం · 2 & 3 డిసెంబర్ 2026",
      langName: "తెలుగు",
      invocation: "శ్రీరస్తు! శుభమస్తు! కళ్యాణమస్తు!",
      bride: "రిషిత",
      groom: "వినోద్ సాయి",
      coverWhen: "తిరుపతి, 2 & 3 డిసెంబర్ 2026",
      openInvitation: "ఆహ్వానాన్ని తెరవండి",

      inviteLine:
        "ముత్యాల పందిరిలో... వేదమంత్రాల నడుమ... మూడుముళ్ళ బంధంతో... ఏడడుగుల అనుబంధంతో... ఒక్కటయ్యే వేళ...",
      brideHonorific: "చి॥ ల॥ సౌ॥",
      brideFull: "యస్. రిషిత",
      brideIntro: "B.Tech.\nSoftware Engineer",
      groomHonorific: "చి॥",
      groomFull: "యం. వినోద్ సాయి",
      groomIntro: "B.Tech., MBA (IIM Shillong)\nSr. Manager, JSW",
      photoAlt: "పూల వేదికపై రిషిత చేయి పట్టుకుని, ఒకరినొకరు చూసి నవ్వుకుంటున్న వినోద్ సాయి, రిషిత",

      blessingsTitle: "పెద్దల ఆశీస్సులతో",
      bridesParentsLabel: "వధువు తల్లిదండ్రులు",
      bridesParents: "శ్రీమతి పి. రాధిక & శ్రీ మధుసూదన్",
      bridesHome: "భాను నగర్, అవిలాల, తిరుపతి",
      bridesGrandparents:
        "కీ॥శే॥ శ్రీమతి ఎస్. శ్యామలాదేవి & కీ॥శే॥ శ్రీ యస్. వెంకటరమణ మరియు కీ॥శే॥ శ్రీమతి పి. శారదమ్మ & కీ॥శే॥ శ్రీ పి.ఎ. పెరుమాళ్ గార్ల మనుమరాలు",
      groomsParentsLabel: "వరుని తల్లిదండ్రులు",
      groomsParents: "శ్రీమతి యం. పద్మావతి & శ్రీ యం. మదన్ మోహన్",
      groomsHome: "ఉపాధ్యాయ నగర్, తిరుపతి",

      eventsTitle: "శుభ కార్యక్రమాలు",
      receptionName: "రిసెప్షన్ & విందు",
      receptionDate: "బుధవారం, 2 డిసెంబర్ 2026",
      receptionTime: "సాయంత్రం 7:00 గంటలకు",
      muhurthamName: "శుభ ముహూర్తం",
      muhurthamDate: "గురువారం, 3 డిసెంబర్ 2026",
      muhurthamTime: "ఉదయాత్పూర్వం 4:00 – 5:00 గంటల మధ్య",
      muhurthamNote:
        "స్వస్తిశ్రీ పరాభవ నామ సంవత్సర కార్తీక బహుళ దశమి, ఉత్తర నక్షత్రయుక్త శుభ తులా లగ్న పుష్కరాంశము నందు.",
      addGoogle: "Google క్యాలెండర్",
      addIcs: "iPhone లేదా Outlook",
      addToCalendar: "క్యాలెండర్‌లో చేర్చండి",

      countdownTitle: "ముహూర్తానికి ఇంకా",
      days: "రోజులు",
      hours: "గంటలు",
      minutes: "నిమిషాలు",
      seconds: "సెకన్లు",
      countdownDone: "శుభ ముహూర్తం పూర్తయింది. మీ ఆశీస్సులకు ధన్యవాదాలు.",

      photosTitle: "ఫోటోలు",
      closePhoto: "ఫోటో మూసివేయండి",
      prevPhoto: "ముందు ఫోటో",
      nextPhoto: "తర్వాతి ఫోటో",

      venueTitle: "కళ్యాణ వేదిక",
      venueName: "యస్.ఆర్. కన్వెన్షన్",
      venueAddress: "పాత తిరుచానూరు రోడ్డు, అంకాళమ్మ దేవాలయ సమీపం, తిరుపతి",
      directions: "మ్యాప్‌లో దారి చూడండి",

      shareTitle: "అందరికీ పంపండి",
      shareWhatsApp: "WhatsApp లో పంపండి",
      downloadCard: "ఆహ్వాన కార్డు డౌన్‌లోడ్ చేయండి",
      downloadPrinted: "పెండ్లి పత్రిక డౌన్‌లోడ్ చేయండి",
      shareMessage:
        "2 & 3 డిసెంబర్ 2026 న తిరుపతిలో జరిగే రిషిత & వినోద్ సాయి వివాహానికి మీకు సాదర ఆహ్వానం.",

      closingLine: "తామెల్లరు సకుటుంబ సమేతముగా విచ్చేసి వధూవరులను ఆశీర్వదించ ప్రార్థన.",
      signoff: "తమ రాకకు ఎదురుచూచువారు: బంధుమిత్రులు",

      musicOn: "సంగీతం వినండి",
      musicOff: "సంగీతం ఆపండి",
    },
  },
};

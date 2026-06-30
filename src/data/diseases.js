export const diseases = [
  {
    id: "lichen",
    name: "Lichen",
    technicalName: "Lichen Planus / Lichen Simplex",
    description: "An inflammatory condition that can affect skin, hair, nails, and mucous membranes. On the skin, it typically appears as purplish, itchy, flat-topped bumps.",
    symptoms: [
      "Purplish, flat-topped bumps, most often on the inner wrist, forearm, or ankles",
      "Intense itching that can interfere with sleep",
      "Blisters that break to form crusts or scabs",
      "Lacy white patches in the mouth (oral lichen planus)"
    ],
    selfCare: [
      "Apply cool compresses to reduce itching.",
      "Avoid scratching to prevent secondary skin infections.",
      "Take lukewarm baths (you can add colloidal oatmeal).",
      "Moisturize your skin daily with fragrance-free creams."
    ],
    urgency: "medium",
    color: "from-purple-500 to-indigo-600 animate-pulse-slow"
  },
  {
    id: "infestation_bites",
    name: "Infestation Bites",
    technicalName: "Arthropod Bites & Parasitic Infestations",
    description: "Skin reactions caused by insect bites, mites (such as scabies), or bedbugs. They typically manifest as localized, red, swollen, and intensely itchy bumps or tracks.",
    symptoms: [
      "Small, red, raised bumps, sometimes in clusters or linear patterns",
      "Severe, persistent itching, often worsening at night (typical of scabies)",
      "Minor swelling or localized hives around the bite area",
      "Small puncture marks or tiny blisters at the center of the bites"
    ],
    selfCare: [
      "Wash the affected area gently with soap and water.",
      "Apply over-the-counter hydrocortisone cream or calamine lotion.",
      "Use an ice pack wrapped in a cloth to reduce swelling and itching.",
      "Wash bedding, clothing, and towels in hot water and dry on high heat."
    ],
    urgency: "low",
    color: "from-orange-500 to-red-600"
  },
  {
    id: "acne",
    name: "Acne",
    technicalName: "Acne Vulgaris",
    description: "A common skin condition that occurs when hair follicles become clogged with oil (sebum) and dead skin cells, frequently leading to whiteheads, blackheads, pimples, and deeper cysts.",
    symptoms: [
      "Closed plugged pores (whiteheads)",
      "Open plugged pores (blackheads) with a dark surface",
      "Small, red, tender bumps (papules)",
      "Pimples (pustules) which are papules with pus at their tips",
      "Large, solid, painful lumps beneath the skin (nodules or cystic lesions)"
    ],
    selfCare: [
      "Wash your skin gently twice a day with a mild, non-drying cleanser.",
      "Avoid popping, squeezing, or picking pimples, which leads to scarring and infection.",
      "Use oil-free, non-comedogenic cosmetics and skincare products.",
      "Keep hair clean and away from your forehead/face."
    ],
    urgency: "low",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "eczema",
    name: "Eczema",
    technicalName: "Atopic Dermatitis",
    description: "A chronic, inflammatory skin condition that causes dry, red, extremely itchy, and irritated patches. It commonly flares periodically and is frequently seen in individuals with a history of allergies.",
    symptoms: [
      "Severe itching, which is often worse at night",
      "Dry, cracked, scaly skin patches",
      "Red to brownish-gray patches, especially on hands, feet, ankles, elbows, and knees",
      "Small, raised bumps that may leak fluid and crust over when scratched"
    ],
    selfCare: [
      "Moisturize your skin at least twice a day with thick creams or ointments.",
      "Keep baths and showers short (under 10 minutes) and use lukewarm water.",
      "Use gentle, fragrance-free, hypoallergenic soaps and detergents.",
      "Identify and avoid triggers like dry air, harsh chemicals, or wool clothing."
    ],
    urgency: "low",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "ringworm",
    name: "Ringworm",
    technicalName: "Tinea Corporis",
    description: "A highly contagious, superficial fungal infection of the skin. Despite the name, it is not caused by a worm; it is characterized by a distinctive ring-shaped rash.",
    symptoms: [
      "A circular, flat rash with a raised, scaly red edge",
      "The center of the ring may be clear, scaly, or scattered with red bumps",
      "Persistent itching and localized skin irritation",
      "Slightly raised border that expands outward over time"
    ],
    selfCare: [
      "Keep the infected area clean and dry.",
      "Apply an over-the-counter antifungal cream (such as clotrimazole or miconazole) daily.",
      "Avoid sharing personal items like towels, clothing, or hairbrushes.",
      "Wash hands thoroughly after touching the affected area to prevent spread."
    ],
    urgency: "low",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "actinic_keratosis",
    name: "Actinic Keratosis",
    technicalName: "Solar Keratosis",
    description: "A rough, scaly, or crusty patch of skin caused by years of ultraviolet (UV) radiation exposure from the sun or tanning beds. It is considered precancerous and should be evaluated by a dermatologist.",
    symptoms: [
      "Rough, dry, or scaly patch of skin, usually less than 1 inch (2.5 cm) in diameter",
      "Flat to slightly raised patch or bump on the top layer of skin",
      "Color ranging from pink, red, or brown, to flesh-colored",
      "Itching, burning, or sand-paper feeling in the affected area"
    ],
    selfCare: [
      "Avoid further direct sun exposure, especially during peak hours (10 AM to 4 PM).",
      "Apply broad-spectrum sunscreen (SPF 30+) daily on all sun-exposed areas.",
      "Wear protective clothing, wide-brimmed hats, and UV-blocking sunglasses.",
      "Examine your skin regularly and schedule an evaluation with a dermatologist."
    ],
    urgency: "medium",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: "lupus",
    name: "Lupus Rash",
    technicalName: "Cutaneous Lupus Erythematosus",
    description: "An autoimmune disease where the body's immune system attacks its own tissues. It often presents on the skin as a distinctive 'butterfly-shaped' rash across the bridge of the nose and cheeks, or as scaly, disc-shaped lesions.",
    symptoms: [
      "Red, butterfly-shaped rash spreading over the cheeks and nose bridge (malar rash)",
      "Red, raised, scaly circular patches (discoid rash) that can scar",
      "Increased skin sensitivity to sunlight, triggering or worsening skin flares",
      "Sores or ulcers in the mouth or nose"
    ],
    selfCare: [
      "Apply a high-SPF broad-spectrum sunscreen daily, even on cloudy days.",
      "Wear sun-protective clothing, including hats and long sleeves.",
      "Avoid intense artificial light sources and direct midday sun.",
      "Consult a rheumatologist or dermatologist for systemic management."
    ],
    urgency: "medium",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    id: "mole",
    name: "Mole",
    technicalName: "Melanocytic Naevus",
    description: "A common, benign skin growth that occurs when pigment-producing cells (melanocytes) grow in clusters. Most moles are completely harmless, but any mole that changes size, shape, or color should be monitored.",
    symptoms: [
      "Small, round, or oval spot on the skin, typically brown or black",
      "Flat or raised surface that is usually uniform in color",
      "Smooth or rough texture, sometimes with hair growing from it",
      "Typically stable, showing no rapid changes over time"
    ],
    selfCare: [
      "Perform monthly skin self-exams using the ABCDE guide (Asymmetry, Border, Color, Diameter, Evolving).",
      "Protect your skin from UV radiation with clothing and SPF sunscreen.",
      "Take high-resolution photos of your moles to track any visual changes over time.",
      "Have a dermatologist perform an annual full-body skin check."
    ],
    urgency: "low",
    color: "from-stone-500 to-neutral-700"
  },
  {
    id: "vitiligo",
    name: "Vitiligo",
    technicalName: "Vitiligo Vulgaris",
    description: "A chronic skin disorder characterized by the loss of pigment-producing melanocytes, resulting in smooth, pale, or completely white patches of skin. It is an autoimmune condition and is completely non-contagious.",
    symptoms: [
      "Patchy loss of skin color, usually first appearing on sun-exposed areas (hands, face, feet)",
      "Premature whitening or graying of the hair on your scalp, eyelashes, eyebrows, or beard",
      "Loss of color in the tissues that line the inside of the mouth and nose (mucous membranes)",
      "Symmetrical distribution of white patches on both sides of the body"
    ],
    selfCare: [
      "Apply high-SPF sunscreen to white patches, as they lack melanin protection and sunburn easily.",
      "Use safe cosmetic concealers, self-tanners, or skin dyes to blend patches if desired.",
      "Avoid skin injuries or trauma (Koebner phenomenon), which can trigger new vitiligo patches.",
      "Seek support groups or counseling if the condition impacts self-esteem."
    ],
    urgency: "low",
    color: "from-sky-300 to-indigo-400"
  },
  {
    id: "skin_cancer",
    name: "Skin Cancer Warning Signs",
    technicalName: "Basal / Squamous Cell Carcinoma or Melanoma",
    description: "Abnormal growth of skin cells, most commonly developing on sun-exposed skin. Melanoma is the most aggressive form, recognized by asymmetrical, irregular moles. Early detection is life-saving.",
    symptoms: [
      "Asymmetry: One half of the mole or birthmark does not match the other",
      "Border: Edges are irregular, ragged, notched, or blurred",
      "Color: Color is not uniform and may include shades of brown, black, pink, or red",
      "Diameter: Spot is larger than 6mm (about the size of a pencil eraser)",
      "Evolving: The mole is changing in size, shape, color, or is bleeding/itching"
    ],
    selfCare: [
      "CRITICAL: Schedule an immediate evaluation with a certified dermatologist.",
      "Do NOT scratch, pick, or attempt to self-treat any suspicious lesion.",
      "Avoid all deliberate sun tanning and tanning beds.",
      "Protect all skin areas from sunburn using high SPF protection and physical barriers."
    ],
    urgency: "high",
    color: "from-red-600 to-stone-900 border-2 border-red-500 animate-pulse"
  },
  {
    id: "unknown_normal",
    name: "Unknown / Healthy Skin",
    technicalName: "Unspecified or Normal Skin Physiology",
    description: "The skin appears healthy or has minor, non-pathological blemishes (such as dry skin, natural freckles, or minor temporary irritation) that do not correspond to the targeted skin conditions.",
    symptoms: [
      "Skin exhibits typical pigmentation and texture",
      "No suspicious growing spots, irregular borders, or active inflammatory lesions",
      "Minor friction marks, standard birthmarks, or non-spreading tiny blemishes",
      "General absence of severe itching, bleeding, or weeping fluid"
    ],
    selfCare: [
      "Maintain a daily gentle skin cleansing and moisturizing routine.",
      "Stay hydrated and maintain a balanced diet for skin health.",
      "Apply sunscreen whenever spending extended time outdoors.",
      "Continue monitoring skin periodically for any new or evolving changes."
    ],
    urgency: "low",
    color: "from-slate-400 to-slate-500"
  }
];

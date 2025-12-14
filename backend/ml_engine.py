from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def find_best_mentors(elderly_user, all_mentors):
    """
    Finds mentors matching language and interests.
    Uses Cosine Similarity and handles Numpy Matrix issues.
    """
    
    # --- DEBUG PRINTS (Server Terminal me dikhega) ---
    print("\n" + "="*50)
    print("🔍 MATCHING ENGINE STARTED")
    
    # 1. Clean Data
    elderly_lang = (elderly_user.language or "").strip().lower()
    elderly_interests = (elderly_user.interests or "general").strip()
    
    print(f"👤 ELDERLY: {elderly_user.username} | Lang: {elderly_lang} | Wants: {elderly_interests}")

    # 2. Filter by Language
    compatible_mentors = []
    
    for m in all_mentors:
        mentor_lang = (m.language or "").strip().lower()
        
        # Check if Language Matches
        if mentor_lang == elderly_lang and elderly_lang != "":
            compatible_mentors.append(m)
            
    if not compatible_mentors:
        print("⚠️  No language matches found.")
        return []

    print(f"📋 Found {len(compatible_mentors)} mentors with same language. Calculating scores...")

    # 3. Machine Learning (Interests Match)
    try:
        # Data Prepare karna: [Dadaji_Interest, Mentor1, Mentor2...]
        documents = [elderly_interests]
        for m in compatible_mentors:
            documents.append(m.interests or "general")
        
        # Vectorization (Text -> Numbers)
        count_vectorizer = CountVectorizer(stop_words='english')
        sparse_matrix = count_vectorizer.fit_transform(documents)
        
        # --- FIX: .todense() ki jagah .toarray() use kiya (Numpy Error Fix) ---
        doc_term_matrix = sparse_matrix.toarray()
        # ----------------------------------------------------------------------

        # Cosine Similarity Calculation
        df = cosine_similarity(doc_term_matrix[0:1], doc_term_matrix[1:])
        
        results = []
        for i, score in enumerate(df[0]):
            mentor = compatible_mentors[i]
            final_score = round(float(score) * 100, 2)
            
            # Sirf tabhi add karein agar score 0 se zyada ho, ya testing ke liye sabko dikhayein
            results.append({
                "mentor_id": mentor.id,
                "name": mentor.username,
                "email": mentor.email,
                "match_score": final_score,
                "interests": mentor.interests
            })
            
        # Sort by Highest Score
        results.sort(key=lambda x: x['match_score'], reverse=True)
        print(f"✅ Returning {len(results)} matches.")
        print("="*50 + "\n")
        return results

    except Exception as e:
        print(f"❌ ML Calculation Error: {e}")
        return []


def suggest_interests_from_text(text: str):
    """
    NLP Logic: Hindi (Devanagari) aur Hinglish dono samajhne wala logic.
    User ki aam bolchaal ko 'Technical Skills' mein badalta hai.
    """
    if not text:
        return ""
        
    text = text.lower() # Sab chote aksharon mein convert
    suggested_skills = []

    # --- ADVANCED KEYWORD MAP (Dimag) ---
    keywords_map = {
        # 1. Communication (Baat karna)
        "baat": ["Video Calling", "WhatsApp"],
        "baatein": ["Video Calling", "WhatsApp"],
        "बात": ["Video Calling", "WhatsApp"],
        "pota": ["Video Calling", "WhatsApp"],
        "poti": ["Video Calling", "WhatsApp"],
        "pote": ["Video Calling", "WhatsApp"],
        "beta": ["Video Calling", "WhatsApp"],
        "beti": ["Video Calling", "WhatsApp"],
        "बेटा": ["Video Calling", "WhatsApp"],
        "बेटी": ["Video Calling", "WhatsApp"],
        "videsh": ["Video Calling", "Skype"],
        "bidesh": ["Video Calling", "Skype"],
        "विदेश": ["Video Calling", "Skype"],
        "face": ["Video Calling", "Zoom"],
        "shakal": ["Video Calling"],
        "shakl": ["Video Calling"],

        # 2. Entertainment (Manoranjan)
        "dekhna": ["YouTube", "Movies"],
        "picture": ["YouTube", "Movies"],
        "film": ["YouTube", "Netflix"],
        "फिल्म": ["YouTube", "Netflix"],
        "bor": ["YouTube", "Music", "Online Games"],
        "bore": ["YouTube", "Music", "Online Games"],
        "boring": ["YouTube", "Music", "Online Games"],
        "gaana": ["Music", "Spotify", "YouTube"],
        "gaane": ["Music", "Spotify", "YouTube"],
        "geet": ["Music", "YouTube"],
        "music": ["Music", "Spotify"],
        "gana": ["Music", "YouTube"],
        "गाना": ["Music", "YouTube"],

        # 3. Finance (Paisa)
        "paise": ["Paytm", "Google Pay", "Online Banking"],
        "paisa": ["Paytm", "Google Pay", "Online Banking"],
        "पैसे": ["Paytm", "Google Pay", "Online Banking"],
        "bank": ["Online Banking", "Security"],
        "bajar": ["Online Shopping", "Amazon"],
        "market": ["Online Shopping", "Amazon"],
        "khareedna": ["Online Shopping", "Amazon"],
        "shop": ["Online Shopping", "Flipkart"],
        "shopping": ["Online Shopping", "Amazon"],
        "खरीदना": ["Online Shopping", "Amazon"],

        # 4. Daily Life (Rozmarra)
        "samachar": ["News Apps", "Twitter"],
        "khabar": ["News Apps", "Twitter"],
        "news": ["News Apps", "Twitter"],
        "समाचार": ["News Apps", "Twitter"],
        "raasta": ["Google Maps", "Cab Booking"],
        "rasta": ["Google Maps", "Cab Booking"],
        "kahan": ["Google Maps"],
        "kho": ["Google Maps"],
        "रास्ता": ["Google Maps", "Ola/Uber"],
        "khana": ["Cooking", "YouTube Recipes", "Zomato"],
        "banana": ["Cooking", "YouTube Recipes"],
        "recipe": ["Cooking", "YouTube"],
        "खाना": ["Cooking", "YouTube Recipes"],
        "dawai": ["Online Medicine", "Health Apps"],
        "dawaii": ["Online Medicine", "Health Apps"],
        "doctor": ["Online Medicine", "Practo"]
    }

    # Match Logic: Sentence mein dhoondo
    for keyword, skills in keywords_map.items():
        if keyword in text:
            suggested_skills.extend(skills)
    
    # Duplicates hatao
    unique_skills = list(set(suggested_skills))
    
    # Agar koi keyword match nahi hua, to user ne jo bola wahi wapas kar do
    if not unique_skills:
        return text 
        
    return ", ".join(unique_skills)
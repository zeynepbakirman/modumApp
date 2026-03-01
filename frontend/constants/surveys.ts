export const SURVEY_QUESTIONS: Record<string, string[]> = {
  "Bağımlılık": [
    "Alkol veya madde kullanımı günlük hayatımı aksatıyor.",
    "Bırakmak istediğim halde kullanımımı kontrol edemiyorum.",
    "Kullanım miktarımı giderek artırma ihtiyacı duyuyorum.",
    "Kullanmadığım zamanlarda huzursuzluk ve yoksunluk hissediyorum.",
    "Sosyal ilişkilerim bu alışkanlığım yüzünden zarar görüyor."
  ],
  "Anksiyete": [
    "Kendimi çoğu zaman aşırı endişeli hissediyorum.",
    "Gelecekle ilgili kötü bir şey olacakmış gibi bir hissim var.",
    "Endişelerimi kontrol etmekte zorlanıyorum.",
    "Huzursuz, gergin veya tetikte hissediyorum.",
    "Kaslarımın gergin olduğunu hissediyorum."
  ],
  "Depresyon": [
    "Kendimi üzgün, boşlukta veya umutsuz hissediyorum.",
    "Eskiden keyif aldığım şeylere karşı ilgimi kaybettim.",
    "Enerjim çok düşük, kendimi sürekli yorgun hissediyorum.",
    "Kendimi değersiz veya suçlu hissediyorum.",
    "Ölüm veya kendime zarar verme düşünceleri aklımdan geçiyor."
  ],
  "Partner Şiddeti": [
    "Partnerimin yanındayken kendimi güvende hissetmiyorum.",
    "Partnerim beni sık sık eleştiriyor veya aşağılıyor.",
    "Partnerim kiminle görüştüğümü veya nereye gittiğimi kısıtlıyor.",
    "Partnerimden korktuğum için bazı şeyleri söylemekten çekiniyorum.",
    "Partnerim bana fiziksel olarak zarar verdi veya tehdit etti."
  ],
  "Yeme Bozukluğu": [
    "Yemek yeme alışkanlıklarım üzerinde kontrolümü kaybettiğimi hissediyorum.",
    "Vücut ağırlığım veya şeklim hakkında aşırı endişeleniyorum.",
    "Yemek yedikten sonra kendimi suçlu hissediyorum.",
    "Başkalarının yanında yemek yemekten kaçınıyorum.",
    "Kilo vermek için sağlıksız yöntemlere başvuruyorum."
  ],
  "Uyku Bozukluğu": [
    "Uykuya dalmakta güçlük çekiyorum.",
    "Gece sık sık uyanıyorum ve tekrar uyuyamıyorum.",
    "Sabahları yorgun ve dinlenmemiş uyanıyorum.",
    "Gün içinde uykulu hissetmek işlerimi zorlaştırıyor.",
    "Uyku düzenim çok düzensiz."
  ],
  "Genel Sağlık": [
    "Kendimi fiziksel olarak sağlıklı hissediyorum. (Ters)",
    "Düzenli olarak egzersiz yapıyorum. (Ters)",
    "Beslenmeme dikkat ediyorum. (Ters)",
    "Yeterli miktarda su içiyorum. (Ters)",
    "Vücudumda açıklayamadığım ağrılar hissediyorum."
  ],
  "Beslenme": [
    "Günde en az 3 öğün düzenli yemek yiyorum. (Ters)",
    "Abur cubur ve işlenmiş gıda tüketimim çok fazla.",
    "Meyve ve sebze tüketimine özen gösteriyorum. (Ters)",
    "Gece geç saatlerde yemek yeme alışkanlığım var.",
    "Yemek yerken porsiyon kontrolü yapabiliyorum. (Ters)"
  ],
  "Uyku": [
    "Günde ortalama 7-8 saat uyuyorum. (Ters)",
    "Uykudan önce telefon/ekran kullanımım çok fazla.",
    "Uyuduğum ortam sessiz ve karanlık. (Ters)",
    "Yatış ve kalkış saatlerim her gün benzer. (Ters)",
    "Gündüz uykusu uyuma ihtiyacı hissediyorum."
  ]
};

// Questions that are POSITIVE (Higher score means BETTER health)
// All others are NEGATIVE (Higher score means WORSE health)
export const POSITIVE_QUESTIONS: Record<string, number[]> = {
  "Genel Sağlık": [0, 1, 2, 3],
  "Beslenme": [0, 2, 4],
  "Uyku": [0, 2, 3]
};

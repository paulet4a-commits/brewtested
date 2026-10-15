# Affiliate çalışma sırası — 15 Ekim 2026

Amaç, mevcut içerik ve hesaplardan ölçülebilir trafik ve nitelikli dönüşüm üretmektir. Günlük denetim bu hedefin gözlem katmanıdır; kendi başına müşteri edinmez.

## Çalışma düzeni

- **Günlük gözcü:** GitHub Actions, 05:17 UTC / 08:17 Türkiye saatinde site erişimi, kaynak iddiaları, ürün inceleme tarihleri ve dört resmî program sayfasını kontrol eder. Zamanlama gecikebilir. Rapor, önceki gözlemle karşılaştırılır; aynı bulgu her gün yeni iş sayılmaz.
- **Kalite kapısı:** her içerik değişikliğinde MD/MDX fiziksel test iddiaları, yönlendirme ve yapı kontrolleri ile tam build çalışır. Güncelliği geçmiş ürünler inceleme kuyruğunda kalır; tarihler otomatik tazelenmez.
- **Araştırma işi:** değişen program sayfası ve tarihi geçmiş koşul incelemesi araştırma girdisidir. Model ajanı bu veriyi gerçek kaynaklarla değerlendirir. Bu konuşmadaki alt ajanlar kalıcı arka plan süreçleri değildir.
- **Dağıtım işi:** yalnız ilgili kitleye uygun içerik ve var olan takip linki kullanılır. Dış mesajlar, başvurular, banka/vergi ve şart kabulü otomatik gönderilmez.

## İlk trafik deneyi

1. Mevcut Chrome'da GSC ve analytics erişimini doğrula; gerçek son28/90gün verisi olmadan en çok ziyaret alan sayfa seçildiğini iddia etme.
2. İlk aday kümesi ana sayfada zaten öne çıkan satın alma rehberleridir: coffee-maker-under-50, espresso-machine-under-100, french-press-under-30, burr-grinder-under-100 ve Gaggia/Bambino karşılaştırması. Bu bir editoryal başlangıç seçimi, trafik sıralaması değildir.
3. Seçilen sayfalarda güncel model/ürün bağlantısı, açık affiliate bildirimi, karar kriterleri ve ilgili iç bağlantıları doğrula.
4. Mevcut Pinterest hesabındaki eski pinleri ve gerçek referral trafiğini kontrol et. Aşağıdaki taslaklar yeni paylaşım değildir.
5. Ölç: yayın URL'si ve tarihi, gelen sayfa ziyareti, dış bağlantı tıklaması, provider'ın nitelikli siparişi. Satış ile tıklamayı ayrı tut. Takip sonucu yoksa ölçüm yok yaz.

### Hazır paylaşım metni adayları

| Hedef rehber | Başlık | Açıklama |
|---|---|---|
| /posts/best-coffee-maker-under-50/ | Coffee makers under $50: what to compare | Compare capacity, cleaning, controls and ownership considerations before choosing a budget brewer. Read the research guide. |
| /posts/best-espresso-machine-under-100/ | Starting espresso on a small budget | Review workflow, maintenance and buying criteria before choosing an entry espresso machine. |
| /posts/best-french-press-under-30/ | Choosing a budget French press | Compare size, materials and cleaning needs for your daily coffee routine. |
| /posts/best-burr-grinder-under-100/ | Buying your first burr grinder | Compare brewing compatibility, adjustment and maintenance criteria before buying. |
| /posts/gaggia-classic-pro-vs-breville-bambino-plus/ | Gaggia or Bambino: compare the workflow | Think through learning curve, maintenance and daily routine before choosing your espresso setup. |

Fiyat başlığının hâlâ doğru olduğu ayrıca kontrol edilmeden pin yayımlanmaz. Yeni görsel servisi veya ücretli araç çağrısı yok.

## Program işleri

Asıl eski başvuru kaydı `docs/direct-affiliate-outreach.md`; public koşul gözlemi `docs/reports/2026-10-15-affiliate-program-research.json`. Snapshot ve gözcü çıktısı hesap onayı değildir.

- **Amazon:** mevcut kayıt/180gün süresi ve ödeme yöntemi doğrulaması; nitelikli trafik edinimi. ABD vergi durumunun tamamlanması satış veya ödeme garantisi değildir.
- **Beehiiv:** mevcut Dub bağlantısı kontrolü ve creator/newsletter kitlesi için gerçek kullanım rehberi. Kahve rehberlerine ilgisiz link ekleme.
- **Apify:** mevcut9Ekim başvuru zinciri üzerinden takip taslağı; onaylı link gelmeden link üretme. Affiliate linki Apify-owned Store/Actor sayfalarına yerleştirme; uygun kendi haricî rehberlerinde kullan.
- **WLL/Lifeboost:** önce mevcut başvuru/şart sonucunu doğrula, sonra gerçek takipli URL ve onay ile yönlendirme aç. Sıradan mağaza URL'sinde yalnız `approved:true` yapmak komisyon takibini kurmaz.

## Sınırlar ve kanıt

GitHub standart public-repo Linux runner'ı kullanılır; ücretli model/API, reklam, yeni domain/hosting yok. Hesap sırları GitHub'a taşınmaz. Denetim sadece public sayfaları okur; gelir, GSC, payout ve onay verileri korumalı oturumdan ayrı doğrulanır. CAPTCHA/erişim engeli veya eksik kaynak ölçüm yok olarak kalır.

Kaynak başına/tur başına istek sınırı kesindir; aynı gün tekrar bastırma önceki cache snapshotının başarıyla korunmasına bağlıdır. Cache kaybı veya bağımsız branch/yerel koşu küresel günlük kota garantisi vermez. Workflow'un yeşil olması kaynakların sağlıklı veya koşulların onaylı olduğu anlamına gelmez; summary kapsama ve erişim hatalarını ayrıca gösterir.

Günlük koşu kayıtları GitHub Actions **Affiliate operations** sayfasındadır. Summary ve JSON artifactları yedi gün saklanır; cache karşılaştırma içindir, ana işletme kaydı değildir. Public repoda uzun hareketsizlik zamanlamayı devre dışı bırakabilir; işin son koşu tarihini kontrol et. Doğal zamanlanmış ilk koşu gerçekleşmeden günlük devam kanıtı oluşmuş sayılmaz.

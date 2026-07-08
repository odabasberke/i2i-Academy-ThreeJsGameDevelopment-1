### 📝 Proje Açıklaması
Bu proje, herhangi bir üçüncü taraf tarayıcı eklentisine ihtiyaç duymadan tamamen web tarayıcısı üzerinde çalışan, sonsuz bir 3 boyutlu engelden kaçma oyunudur. Oyuncu, dinamik bir 3D küpü kontrol eder ve rastgele oluşturulan engellere çarpmamak için yatay eksende hareket eder. Oyun; gerçek zamanlı çarpışma doğrulaması, duyarlı ekran ölçeklemesi (responsive aspect ratio), gölge haritalama hesaplamaları ve standart klavye girdilerinin işlenmesi gibi kritik grafik programlama süreçlerini içerir.

### 🚀 Öne Çıkan Özellikler
* **Sahne Altyapısı (Scene Infrastructure):** Doğal ortam aydınlatması için `AmbientLight` ve gerçekçi gölgeler oluşturmak üzere yapılandırılmış bir `DirectionalLight` içeren dengeli bir ışık modeli ile `PerspectiveCamera` bileşenini kullanır.
* **Oyun Döngüsü (Game Loop):** Kare tabanlı nesne hareketlerini, alt animasyon hesaplamalarını ve oyun durum değişikliklerini optimize bir şekilde yöneten `requestAnimationFrame` tabanlı render döngüsünü temel alır.
* **Yordamsal Engel Oluşturma (Procedural Spawning):** Engeller, kameranın görüş açısının dışındaki rastgele koordinatlarda programatik olarak üretilir ve bellek performansını optimize etmek amacıyla ekranın arkasında kaldıklarında otomatik olarak bellekten (heap) temizlenir.
* **Çarpışma Algılama Matrisi (Collision Detection):** Oyuncu modeli ile aktif engeller arasındaki anlık temasları yakalamak için Three.js'in `THREE.Box3` kesişim algoritmalarını ve Eksen Hizalamalı Sınır Kutularını (AABB) kullanır.
* **Hibrit Arayüz Katmanı (UI Overlay):** WebGL tuvalinin (canvas) hemen üzerinde yer alan, anlık skor durumunu gösteren ve oyun bittiğinde yeniden başlatma tetikleyicilerini yakalayan bağımsız bir 2D HTML/CSS arayüz katmanı barındırır.

---

### 💻 Nasıl Kurulur ve Çalıştırılır

#### Gereksinimler
Bilgisayarınızda [Node.js](https://nodejs.org/) sisteminin (LTS sürümü önerilir) kurulu olduğundan emin olun.

#### Adım Adım Çalıştırma Yönergesi

1.  **Proje Dizinini Açın:**
    Kullandığınız terminal uygulamasını (Windows PowerShell, Komut İstemi veya VS Code Entegre Terminali) açarak `package.json` dosyasının bulunduğu ana klasöre geçiş yapın:
    ```bash
    cd threejs-game
    ```

2.  **Gerekli Bağımlılıkları Yükleyin:**
    Projenin ihtiyaç duyduğu node paketlerini indirmek için şu komutu çalıştırın:
    ```bash
    npm install
    ```

3.  **Yerel Geliştirme Sunucusunu Başlatın:**
    Vite yerel geliştirme sunucusunu ayağa kaldırın:
    ```bash
    npm run dev
    ```

4.  **Oyuna Giriş Yapın:**
    Derleme işlemi tamamlandığında terminalde beliren adrese `CTRL` tuşuna basılı tutarak tıklayın veya tarayıcınızdan şu adrese gidin:
    ```text
    http://localhost:5173/
    ```

* **Kontroller:** Sağa ve sola hareket etmek için `A` / `D` tuşlarını veya `Sol/Sağ Yön` tuşlarını kullanabilirsiniz. Oyun bittiğinde (Game Over) oyunu yeniden başlatmak için `R` tuşuna basabilir veya ekrandaki panele tıklayabilirsiniz.

---

### ⚠️ Karşılaşılabilecek Zorluklar ve Çözümleri

#### 1. Komut Tanınmadı Hatası (`The term 'npm' is not recognized`)
* **Nedeni:** Node.js yolunun çevre değişkenlerine (`PATH`) kaydedilmemiş olması veya terminal penceresinin kurulum tamamlanmadan önce açılmış olmasıdır.
* **Çözümü:** Açık olan tüm PowerShell/CMD pencerelerini kapatın, Node.js kurulum sihirbazını eksiksiz tamamlayın ve çevre değişkenlerinin yenilenmesi için terminali yeniden başlatın.

#### 2. Proje Dosyası Bulunamadı Hatası (`ENOENT: no such file or directory, open package.json`)
* **Nedeni:** `npm run dev` veya `npm install` komutlarını projenin kendi alt klasörü yerine bir üst dizinde çalıştırmaya çalışmaktır.
* **Çözümü:** Node komutlarını çalıştırmadan önce `cd threejs-game` komutu ile projenin ana dizinine girdiğinizden emin olun.

#### 3. Dosya Yükleme ve Dönüşüm Hataları (`Failed to load url /main.js`)
* **Nedeni:** Proje klasör yapısı ile ana `index.html` dosyası içinde tanımlanan Javascript dosya yolunun birbiriyle uyuşmamasıdır.
* **Çözümü:** Script dosyasının kaynağını modern Vite yapısına uygun hale getirmek için yol tanımını `src` klasörünü gösterecek şekilde güncelleyin:
    ```html
    <script type="module" src="/src/main.js"></script>
    ```

#### 4. Gölgelerin Görünmemesi Sorunu
* **Nedeni:** Three.js üzerinde gölge çizimi; render yeteneği, gölgeyi yansıtan nesne ve gölgeyi kabul eden zemin olmak üzere 3 farklı noktada yapılandırma gerektirir.
* **Çözümü:** Kodunuzda `renderer.shadowMap.enabled = true` ifadesinin yer aldığından, oyuncu ve engeller için `castShadow = true` yapıldığından ve zemin düzlemi (ground) için `receiveShadow = true` özelliğinin eklendiğinden emin olun.
"""

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme_content)

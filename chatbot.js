// ==========================================
// STUDIO-WEBKILAT AI CHATBOT SYSTEM
// Role: CS + Sales Automation
// ==========================================

const CHAT_ADMIN_EMAIL = "trimowawan89@gmail.com";

// 1. Inject Chat UI via Javascript ke Body HTML
const chatHTML = `
<div id="swk-chat-widget" style="position: fixed; bottom: 30px; right: 30px; z-index: 9999; font-family: 'Inter', sans-serif;">
    <!-- Chat Button -->
    <button id="swk-chat-btn" onclick="toggleChat()" style="background: linear-gradient(90deg, #D4AF37, #B8860B); color: #0A0A0A; border: none; width: 60px; height: 60px; border-radius: 50%; box-shadow: 0 4px 15px rgba(212,175,55,0.4); cursor: pointer; display: flex; justify-content: center; align-items: center; transition: transform 0.3s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
    </button>

    <!-- Chat Box -->
    <div id="swk-chat-box" style="display: none; width: 350px; height: 500px; background: #1A1A1A; border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); flex-direction: column; position: absolute; bottom: 80px; right: 0; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(90deg, #D4AF37, #B8860B); padding: 20px; color: #0A0A0A; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h4 style="margin: 0; font-family: 'Poppins', sans-serif; font-weight: 700;">STUDIO-WEBKILAT AI</h4>
                <p style="margin: 0; font-size: 0.8rem; font-weight: 500;">Online - Siap Melayani</p>
            </div>
            <button onclick="toggleChat()" style="background: transparent; border: none; color: #0A0A0A; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <!-- Messages Area -->
        <div id="swk-chat-messages" style="flex: 1; padding: 20px; overflow-y: auto; background: #0A0A0A; display: flex; flex-direction: column; gap: 15px;">
            <!-- Initial Message -->
            <div style="background: #1A1A1A; border: 1px solid rgba(212,175,55,0.2); color: #F5F5F5; padding: 12px 16px; border-radius: 12px 12px 12px 0; max-width: 85%; font-size: 0.9rem;">
                Halo! 👋 Saya AI Assistant dari STUDIO-WEBKILAT.<br><br>Ada yang bisa saya bantu? Anda bisa tanya tentang harga paket, cara pesan, DP, atau garansi.
            </div>
        </div>

        <!-- Input Area -->
        <div style="padding: 15px; background: #1A1A1A; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 10px;">
            <input type="text" id="swk-chat-input" placeholder="Ketik pesan..." style="flex: 1; padding: 10px 15px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); background: #0A0A0A; color: #F5F5F5; outline: none; font-family: 'Inter', sans-serif; font-size: 0.9rem;" onkeypress="handleEnter(event)">
            <button onclick="sendMessage()" style="background: #D4AF37; color: #0A0A0A; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', chatHTML);

// 2. UI Toggles & Input Handling
const chatBox = document.getElementById('swk-chat-box');
const chatInput = document.getElementById('swk-chat-input');
const chatMessages = document.getElementById('swk-chat-messages');

function toggleChat() {
    if (chatBox.style.display === 'none') {
        chatBox.style.display = 'flex';
        chatInput.focus();
    } else {
        chatBox.style.display = 'none';
    }
}

function openChatWithText(text) {
    if (chatBox.style.display === 'none') toggleChat();
    chatInput.value = text;
    sendMessage();
}

function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

// 3. Logic Chat & AI Brain
function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append User Message
    appendMessage(text, 'user');
    chatInput.value = '';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI thinking delay
    setTimeout(() => {
        const reply = generateAIResponse(text.toLowerCase());
        appendMessage(reply, 'ai');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
}

function appendMessage(text, sender) {
    const isUser = sender === 'user';
    const align = isUser ? 'align-self: flex-end;' : 'align-self: flex-start;';
    const bg = isUser ? 'background: #D4AF37; color: #0A0A0A;' : 'background: #1A1A1A; border: 1px solid rgba(212,175,55,0.2); color: #F5F5F5;';
    const radius = isUser ? 'border-radius: 12px 12px 0 12px;' : 'border-radius: 12px 12px 12px 0;';

    const msgDiv = document.createElement('div');
    msgDiv.style.cssText = `max-width: 85%; padding: 12px 16px; font-size: 0.9rem; margin-bottom: 5px; line-height: 1.5; ${align} ${bg} ${radius}`;
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
}

// 4. NLP Matcher (CS + Sales to Email)
function generateAIResponse(input) {
    // A. Sales & Pemesanan (Pemicu email)
    if (input.includes('landing') || input.includes('1.5') || input.includes('1,5')) {
        return createOrderLink("Paket Landing Page (Rp1.500.000)", "Pilihan cerdas! Paket Landing Page Rp1.500.000 sangat cocok untuk kampanye produk.");
    }
    if (input.includes('company') || input.includes('profile') || input.includes('3.5') || input.includes('3,5')) {
        return createOrderLink("Paket Company Profile (Rp3.500.000)", "Pilihan favorit! Paket Company Profile Rp3.500.000 akan meningkatkan kredibilitas perusahaan Anda.");
    }
    if (input.includes('e-commerce') || input.includes('ecommerce') || input.includes('toko') || input.includes('7.5') || input.includes('7,5')) {
        return createOrderLink("Paket E-Commerce (Rp7.500.000)", "Luar biasa! Paket E-Commerce Rp7.500.000 sudah lengkap dengan payment gateway.");
    }
    
    if (input.includes('pesan') || input.includes('beli') || input.includes('order') || input.includes('buat')) {
        return "Boleh, Anda ingin memesan paket yang mana?<br><br>- <b>Landing Page</b> (Rp1.5M)<br>- <b>Company Profile</b> (Rp3.5M)<br>- <b>E-Commerce</b> (Rp7.5M)<br><br><i>Balas dengan nama paket.</i>";
    }

    // B. FAQ Customer Service
    if (input.includes('harga') || input.includes('paket') || input.includes('layanan') || input.includes('berapa')) {
        return "Kami memiliki 3 paket utama:<br>1. <b>Landing Page</b> - Rp1.500.000<br>2. <b>Company Profile</b> - Rp3.500.000 (Terpopuler)<br>3. <b>E-Commerce</b> - Rp7.500.000<br><br>Paket mana yang ingin Anda pesan hari ini?";
    }
    if (input.includes('dp') || input.includes('bayar') || input.includes('cicil') || input.includes('awal')) {
        return "Untuk pembayaran, Anda cukup membayar <b>DP 50%</b> di awal untuk mulai pengerjaan. Sisa 50% dibayarkan saat website selesai (dalam 10 hari) dan siap serah terima.";
    }
    if (input.includes('garansi') || input.includes('revisi') || input.includes('rusak') || input.includes('error')) {
        return "Tenang saja, kami memberikan <b>Garansi 14 Hari Kerja</b> setelah serah terima. Perbaikan bug dan error selama masa itu 100% GRATIS.";
    }
    if (input.includes('domain') || input.includes('hosting') || input.includes('server')) {
        return "Semua paket kami <b>SUDAH TERMASUK</b> gratis Domain (.com / .id / dll sesuai ketersediaan) dan Hosting SSD super cepat selama 1 tahun penuh.";
    }
    if (input.includes('lama') || input.includes('waktu') || input.includes('hari') || input.includes('selesai')) {
        return "Kami menjamin website Anda selesai dalam waktu <b>10 hari kerja</b> setelah materi dan DP kami terima.";
    }
    if (input.includes('halo') || input.includes('hai') || input.includes('pagi') || input.includes('siang') || input.includes('malam')) {
        return "Halo! Ada yang bisa saya bantu terkait pembuatan website di STUDIO-WEBKILAT? Ingin cek daftar harga kami?";
    }

    // Default Fallback
    return "Maaf, saya kurang mengerti. Anda bisa bertanya seputar harga paket, sistem pembayaran (DP), garansi, atau ketik <b>'pesan'</b> untuk langsung memesan website.";
}

// 5. Fungsi Penghubung ke Email (Sales Conversion)
function createOrderLink(packageName, introText) {
    const subject = encodeURIComponent(`Pemesanan Baru: ${packageName}`);
    const body = encodeURIComponent(`Halo Tim STUDIO-WEBKILAT,\n\nSaya tertarik dan ingin memesan ${packageName}.\n\nMohon informasi lebih lanjut mengenai cara pembayaran DP dan pengiriman materi website.\n\nTerima kasih.`);
    
    return `${introText}<br><br>Klik tombol di bawah ini untuk mengirimkan formulir pemesanan langsung ke email resmi kami:<br><br>
    <a href="mailto:${CHAT_ADMIN_EMAIL}?subject=${subject}&body=${body}" target="_blank" style="display:inline-block; padding:8px 16px; background:#D4AF37; color:#0A0A0A; text-decoration:none; border-radius:8px; font-weight:bold; margin-top:10px;">Lanjut Pesan via Email</a>`;
}

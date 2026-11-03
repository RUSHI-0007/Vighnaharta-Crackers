

-- 1. Insert Initial Settings
INSERT INTO settings (id, upi_enabled, cod_enabled, upi_id, qr_image_path, min_order_amount, accepting_orders, delivery_note)
VALUES (
  1,
  true,
  true,
  '9561851896@ybl',
  NULL,
  300,
  true,
  'ग्रामपंचायत समोर, गणेगाव खालसा परिसरामध्ये २४ तासांत मोफत होम डिलिव्हरी उपलब्ध.'
)
ON CONFLICT (id) DO UPDATE SET
  upi_enabled = EXCLUDED.upi_enabled,
  cod_enabled = EXCLUDED.cod_enabled,
  upi_id = EXCLUDED.upi_id,
  min_order_amount = EXCLUDED.min_order_amount,
  accepting_orders = EXCLUDED.accepting_orders,
  delivery_note = EXCLUDED.delivery_note;

-- 2. Insert 7 Categories
INSERT INTO categories (id, name_en, name_mr, slug, sort_order)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Sparklers', 'फुलबाजे', 'sparklers', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Flower Pots', 'अनार', 'flower-pots', 2),
  ('c1000000-0000-0000-0000-000000000003', 'Ground Chakkars', 'भुईचक्र', 'ground-chakkars', 3),
  ('c1000000-0000-0000-0000-000000000004', 'Rockets', 'रॉकेट', 'rockets', 4),
  ('c1000000-0000-0000-0000-000000000005', 'Sound Crackers', 'आवाज फटाके', 'sound-crackers', 5),
  ('c1000000-0000-0000-0000-000000000006', 'Sky Shots', 'स्काय शॉट्स', 'sky-shots', 6),
  ('c1000000-0000-0000-0000-000000000007', 'Gift Boxes', 'फॅमिली गिफ्ट बॉक्स', 'gift-boxes', 7)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert ~16 Sample Products (All prices are placeholders)
INSERT INTO products (id, category_id, slug, name_en, name_mr, description, price, discount_percent, unit, image_path, in_stock, featured)
VALUES
  -- Category 1: Sparklers (फुलबाजे)
  (
    'a1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'electric-sparklers-10cm',
    '10 cm Electric Sparklers',
    '१० सेमी इलेक्ट्रिक फुलबाजे',
    'धूरमुक्त चमकदार सोनेरी ठिणग्या (Box of 10 sticks)',
    60, 20, 'Box of 10', NULL, true, true
  ),
  (
    'a1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000001',
    'colour-sparklers-15cm',
    '15 cm Colour Sparklers',
    '१५ सेमी रंगीबेरंगी फुलबाजे',
    'लाल, हिरवा आणि पिवळा आकर्षक प्रकाश',
    90, 25, 'Box of 10', NULL, true, false
  ),
  (
    'a1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000001',
    'giant-sparklers-30cm',
    '30 cm Giant Sparklers',
    '३० सेमी मोठे फुलबाजे',
    'दीर्घकाळ जळणारे आणि लहान मुलांसाठी सुरक्षित',
    180, 30, 'Box of 5', NULL, true, false
  ),

  -- Category 2: Flower Pots (अनार)
  (
    'a1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000002',
    'standard-flower-pot',
    'Flower Pots Standard',
    'अनार स्टँडर्ड',
    'उंच सोनेरी कारंजे देणारा लोकप्रिय अनार',
    150, 20, 'Box of 10', NULL, true, true
  ),
  (
    'a1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000002',
    'special-colour-koti',
    'Special Colour Koti',
    'स्पेशल कलर कोटी अनार',
    'अनेक रंगांचा अप्रतिम प्रकाश फवारा',
    240, 25, 'Box of 10', NULL, true, false
  ),
  (
    'a1000000-0000-0000-0000-000000000006',
    'c1000000-0000-0000-0000-000000000002',
    'deluxe-mega-fountain',
    'Deluxe Mega Fountain',
    'डीलक्स महा अनार',
    '२० फूट उंच जाणारा विहंगम सोनेरी प्रकाश',
    350, 30, 'Box of 5', NULL, true, false
  ),

  -- Category 3: Ground Chakkars (भुईचक्र)
  (
    'a1000000-0000-0000-0000-000000000007',
    'c1000000-0000-0000-0000-000000000003',
    'ground-chakkar-special',
    'Ground Chakkar Special',
    'भुईचक्र स्पेशल',
    'जमिनीवर जलद गतीने फिरणारे चक्र',
    120, 20, 'Box of 10', NULL, true, true
  ),
  (
    'a1000000-0000-0000-0000-000000000008',
    'c1000000-0000-0000-0000-000000000003',
    'deluxe-spinning-wheel',
    'Deluxe Spinning Wheel',
    'डीलक्स फिरकी चक्र',
    'रंगीबेरंगी ठिणग्यांसह दीर्घकाळ फिरणारे चक्र',
    200, 25, 'Box of 10', NULL, true, false
  ),

  -- Category 4: Rockets (रॉकेट)
  (
    'a1000000-0000-0000-0000-000000000009',
    'c1000000-0000-0000-0000-000000000004',
    'whistling-rocket',
    'Whistling Sound Rocket',
    'शिट्टी रॉकेट',
    'आकाशात शिट्टी वाजवून वर जाणारा रॉकेट',
    220, 20, 'Box of 10', NULL, true, false
  ),
  (
    'a1000000-0000-0000-0000-000000000010',
    'c1000000-0000-0000-0000-000000000004',
    'lunik-colour-rocket',
    'Lunik Parachute Rocket',
    'पॅराशूट रॉकेट',
    'आकाशात फुटून पॅराशूट खाली येते',
    380, 25, 'Box of 5', NULL, true, true
  ),

  -- Category 5: Sound Crackers (आवाज फटाके)
  (
    'a1000000-0000-0000-0000-000000000011',
    'c1000000-0000-0000-0000-000000000005',
    '2-sound-cracker',
    '2 Sound Cracker',
    '२ आवाज फटाका',
    'दोन वेळा मोठा आवाज करणारा फटाका',
    100, 15, 'Box of 10', NULL, true, false
  ),
  (
    'a1000000-0000-0000-0000-000000000012',
    'c1000000-0000-0000-0000-000000000005',
    'red-fort-lad-1000',
    'Red Fort 1000 Crackers',
    '१००० फटाक्यांची माळ',
    'सलग मोठा आवाज देणारी क्लासिक दिवाळी माळ',
    450, 30, '1 Piece', NULL, true, true
  ),
  (
    'a1000000-0000-0000-0000-000000000013',
    'c1000000-0000-0000-0000-000000000005',
    'hydro-bomb-green',
    'Green Hydro Bomb',
    'ग्रीन हायड्रो बॉम्ब',
    'अतिशय शक्तिशाली मोठा आवाज',
    140, 20, 'Box of 10', NULL, true, false
  ),

  -- Category 6: Sky Shots (स्काय शॉट्स)
  (
    'a1000000-0000-0000-0000-000000000014',
    'c1000000-0000-0000-0000-000000000006',
    'single-sky-shot-colour',
    'Single Sky Shot Colour',
    'सिंगल स्काय शॉट',
    'आकाशात जाऊन उमलणारा विविधरंगी गोळा',
    90, 20, '1 Pipe', NULL, true, false
  ),
  (
    'a1000000-0000-0000-0000-000000000015',
    'c1000000-0000-0000-0000-000000000006',
    '12-shots-multi-colour',
    '12 Shots Multi-Colour Aerial',
    '१२ शॉट्स मल्टिकलर',
    'सलग १२ रंगीबेरंगी आकाशीय फटाके',
    420, 25, '1 Box', NULL, true, true
  ),

  -- Category 7: Gift Boxes (फॅमिली गिफ्ट बॉक्स)
  (
    'a1000000-0000-0000-0000-000000000016',
    'c1000000-0000-0000-0000-000000000007',
    'diwali-family-mega-box',
    'Diwali Family Mega Gift Box (25 Items)',
    'दिवाळी फॅमिली मेगा गिफ्ट बॉक्स (२५ प्रकार)',
    'सर्व आवडत्या फटाक्यांचा संपूर्ण कौटुंबिक संच',
    1500, 35, '1 Big Box', NULL, true, true
  )
ON CONFLICT (slug) DO NOTHING;


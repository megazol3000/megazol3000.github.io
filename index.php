<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>
  <body>
    <div class="container" style="flex-direction: column">
      <?php for ($i = 0; $i < 20; $i++) { ?>
        <div style="display: flex; gap: 20px">
          <?php for ($j = 0; $j < 50; $j++) { ?>
            <div class="eye">
              <div class="rail">
                <div class="ball"></div>
              </div>
            </div>
          <?php } ?>
        </div>
      <?php } ?>
    </div>
  </body>
</html>

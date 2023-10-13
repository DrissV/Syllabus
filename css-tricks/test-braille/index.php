<?php
    if (isset($_POST['envoi_mail'])) {
        $headers = array ();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type:text/html;charset=UTF-8";
        $headers[] = 'From: ' . $_POST['email_expediteur'];
        $message = $_POST['texte'] . "\r\n" . $_POST['braille'];
        mail($_POST['email_destinataire'], $_POST['objet_mail'], str_replace("\r\n", "<br>", $message), implode("\r\n", $headers));
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charsnoneet="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Driss Vandenheede">
        <title>Traducteur braille</title>
        <link rel="stylesheet" href="braille.css">
    </head>
    <body>
        <ul class="a11y_nav">
            <li>
                <a href="#main">Passer au contenu principal de la page</a>
            </li>
        </ul>
        <header role="banner">

        </header>
        <main role="main" id="main" tabindex="-1">
            <section>
                <form id="traduction_braille" method="post">
                    <p><label for="email_expediteur">E-mail de l'expéditeur :</label></p>
                    <p><input type="email" id="email_expediteur" name="email_expediteur" required></p>
                    <p><label for="email_destinataire">E-mail du destinataire :</label></p>
                    <p><input type="email" id="email_destinataire" name="email_destinataire" required></p>
                    <p><label for="objet_mail">Objet du mail</label></p>
                    <p><input type="text" name="objet_mail" id="objet_mail"></p>
                    <p><label for="braille">Entrez le texte que vous voulez traduire en braille :</label></p>
                    <p><textarea type="text" id="texte" name="texte" rows="10" cols="30"></textarea></p>
                    <p>Traduction :</p>
                    <textarea id="braille" name="braille" rows="10" cols="30" readonly></textarea>
                    <!--<div id="braille" class="braille"></div>-->
                    <canvas id="canvas" class="canvas"></canvas>
                    <p><button type="submit" id="submit" name="envoi_mail">Envoyer le mail</button></p>
                </form>
            </section>
        </main>
        <footer role="contentinfo">
        
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
        <script src="braille.js"></script>
    </body>
</html>
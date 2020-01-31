<?php

class index
{

    public function printRules()
    {
        $str = <<<EOF
              Regole gioco straordinario:\n\n
              1) Qualsiasi cella viva con meno di due celle vive adiacenti muore, come per effetto d'isolamento;
              2) Qualsiasi cella viva con due o tre celle vive adiacenti sopravvive alla generazione successiva;
              3) Qualsiasi cella viva con più di tre celle vive adiacenti muore, come per effetto di sovrappopolazione;
              4) Qualsiasi cella morta con esattamente tre celle vive adiacenti diventa una cella viva, come per effetto di riproduzione\n\n
              
              #GAMEOFLIFE\n\n
              
              EOF;
        echo $str;
    }
}

$g = new index();
$g->printRules();
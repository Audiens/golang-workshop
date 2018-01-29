#!/usr/bin/env bash

phan/phan -m checkstyle -o analysis.phan.xml swiftmailer/lib
xsltproc checkstyle-author.xsl 					 analysis.phan.xml >> reports/phan.html
rm -rf analysis.phan.xml




assignment.pdf: ./subdir/main.md
	pandoc --from=markdown \
	 --to=latex \
	 --toc \
	 -o $@ \
	 $< \
	 --shift-heading-level-by -1 \
	 --number-sections


# Rule to merge PDFs into merged.pdf
merged.pdf: assignment.pdf problem1.pdf
	pdftk $^ cat output $@

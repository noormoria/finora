import streamlit as st
import streamlit.components.v1 as components
import base64

st.set_page_config(page_title="Finora", page_icon="📊", layout="wide", initial_sidebar_state="collapsed")

st.markdown("""
<style>
#MainMenu, footer, header {visibility:hidden;}
.stApp {background:#f4f8f5;}
.block-container {padding:0!important;max-width:100%!important;}
iframe {border:0!important;}
</style>
""", unsafe_allow_html=True)

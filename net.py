
from pyexpat.errors import messages

import streamlit as st

on = st.toggle("better UI", value=True)

options = ["News", "Infotainment", "Liked", "Saved"]
selected_option = st.pills("Select an option:", options, selection_mode="single")



if selected_option == "News":
    with open("news.html", "r", encoding="utf-8") as f:
     html_code = f.read()
    st.components.v1.html(html_code, height=800, scrolling=True)

elif selected_option == "Infotainment":
     with open("infotainment.html", "r", encoding="utf-8") as f:
      html_code = f.read()
     st.components.v1.html(html_code, height=800, scrolling=True)
elif selected_option == "Liked":
    with open("liked.html", "r", encoding="utf-8") as f:
        html_code = f.read()
    st.components.v1.html(html_code, height=800, scrolling=True)
elif selected_option == "Saved":
    with open("saved.html", "r", encoding="utf-8") as f:
        html_code = f.read()
    st.components.v1.html(html_code, height=800, scrolling=True)

with st.sidebar:
    messages = st.container(height=200)

prompt = st.chat_input(
    "Say something and/or attach an image",
    accept_file=True,
    file_type=["jpg", "jpeg", "png"],
     accept_audio=True,
)
if prompt and prompt.text:
    st.markdown(prompt.text)
if prompt and prompt["files"]:
    st.image(prompt["files"][0])
if prompt and prompt.audio:
    st.audio(prompt.audio)
    st.write("Audio file:", prompt.audio.name)



    